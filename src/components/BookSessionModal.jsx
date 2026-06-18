"use client";
import { Button, FieldError, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import React from "react";
import { toast } from "react-toastify";

export function BookSessionModal({ tutor, currentUser }) {
    const { 
        _id: tutorId, 
        tutorName, 
        totalSlots, 
        sessionDate 
    } = tutor;

    const studentEmail = currentUser?.email || "student@example.com";
    const studentName = currentUser?.displayName || "John Doe";

    const currentDate = new Date();
    const targetSessionDate = new Date(sessionDate);

    // Rule 1: Checking Date Restriction (Cannot book before session date)
    const isDateBlocked = currentDate < targetSessionDate;

    // Rule 2: Checking Slot Availability
    const isSlotBlocked = totalSlots <= 0;

    const handleBooking = async (e) => {
        e.preventDefault();

        if (isSlotBlocked) {
            toast.error("This session is fully booked. You can't join at the moment.");
            return;
        }
        if (isDateBlocked) {
            toast.error("Booking is not available yet for this tutor");
            return;
        }

        const formData = new FormData(e.currentTarget);
        
        const bookingPayload = {
            tutorId,
            tutorName,
            studentName,
            studentEmail,
            phone: formData.get("phone"),
            bookingStatus: "booked", 
            bookedAt: new Date().toISOString()
        };

        try {
            const res = await fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(bookingPayload),
            });

            if (res.ok) {
                toast.success("Session Booked Successfully!");
                // Reload or refresh router to show the updated decremented slot count
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                const errData = await res.json();
                toast.error(errData.message || "Failed to book session.");
            }
        } catch (error) {
            console.error("Booking submission breakdown error:", error);
            toast.error("Connection error while scheduling.");
        }
    };

    return (
        <Modal>
            {/* Conditional Button triggers based on matching conditions */}
            {isSlotBlocked ? (
                <Button variant="flat" disabled className="bg-red-100 text-red-600 rounded-xl cursor-not-allowed font-medium px-6 py-3">
                    No available slots left.
                </Button>
            ) : isDateBlocked ? (
                <Button variant="flat" disabled className="bg-amber-100 text-amber-700 rounded-xl cursor-not-allowed font-medium px-6 py-3">
                    Booking is not available yet
                </Button>
            ) : (
                <Button className="bg-[#BB6984] hover:bg-[#a3536d] text-white font-bold rounded-xl px-6 py-3 transition-colors">
                    Book Session
                </Button>
            )}

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Confirm Session Booking</Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleBooking} className="space-y-5">
                                    
                                    {/* Student Name  */}
                                    <TextField defaultValue={studentName} name="studentName" isReadOnly>
                                        <Label>Student Name</Label>
                                        <Input className="rounded-2xl bg-gray-50" />
                                    </TextField>

                                    {/* Student Email  */}
                                    <TextField defaultValue={studentEmail} name="studentEmail" isReadOnly>
                                        <Label>Email Address</Label>
                                        <Input type="email" className="rounded-2xl bg-gray-50" />
                                    </TextField>

                                    {/* Tutor Name  */}
                                    <TextField defaultValue={tutorName} name="tutorName" isReadOnly>
                                        <Label>Assigned Tutor</Label>
                                        <Input className="rounded-2xl bg-gray-50" />
                                    </TextField>

                                    {/* Tutor ID  */}
                                    <TextField defaultValue={tutorId} name="tutorId" isReadOnly>
                                        <Label>Tutor ID Code</Label>
                                        <Input className="rounded-2xl bg-gray-50 text-xs text-gray-400" />
                                    </TextField>

                                    {/*  Contact Phone */}
                                    <TextField name="phone" isRequired>
                                        <Label>Your Phone Number</Label>
                                        <Input placeholder="+880 1xxx-xxxxxx" className="rounded-2xl" />
                                        <FieldError />
                                    </TextField>

                                    <div className="pt-2 text-sm text-gray-500">
                                        Remaining Slots Left: <span className="font-bold text-emerald-600">{totalSlots}</span>
                                    </div>

                                    <Modal.Footer className="px-0 pt-4">
                                        <Button type="submit" slot="close" className="w-full bg-[#BB6984] text-white font-bold rounded-2xl py-4">
                                            Confirm Appointment
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}

export default BookSessionModal;