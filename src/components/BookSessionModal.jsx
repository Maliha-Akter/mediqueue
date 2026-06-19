"use client";
import { Button, FieldError, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import React from "react";
import { toast } from "react-toastify";

export function BookSessionModal({ tutor, currentUser }) {
    const {
        _id: tutorId,
        tutorName,
        totalSlots,
        sessionStartDate
    } = tutor;

    const studentEmail = currentUser?.email || "student@example.com";
    const studentName = currentUser?.displayName || "John Doe";
    
    const studentUserId = currentUser?.id || currentUser?._id || "guest_user_id";

    // today's date 
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetSessionDate = sessionStartDate
        ? new Date(sessionStartDate)
        : null;

    if (targetSessionDate) {
        targetSessionDate.setHours(0, 0, 0, 0);
    }

    // Rule: 1
    const isDateBlocked = targetSessionDate && today > targetSessionDate;

    // Rule: 2
    const isSlotBlocked = totalSlots <= 0;

    const handleBooking = async (e) => {
        e.preventDefault();

        if (isSlotBlocked) {
            toast.error("This session is fully booked. You can't join at the moment.");
            return;
        }
        if (isDateBlocked) {
            toast.error("This session has already taken place.");
            return;
        }

        const formData = new FormData(e.currentTarget);

        const bookingPayload = {
            tutorId,
            tutorName,
            studentName,
            studentEmail,
            userId: studentUserId, 
            phone: formData.get("phone"),
            bookingStatus: "booked",
            bookedAt: new Date().toISOString()
        };

        try {
            // 1. Post the Booking payload
            const res = await fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(bookingPayload),
            });
            
            if (res.ok) {
                // 2. AUTO DECREASE SLOT: Updates backend database collection cleanly
                const slotDecrementRes = await fetch(`http://localhost:5000/tutor/${tutorId}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ totalSlots: Math.max(0, totalSlots - 1) }),
                });

                if (slotDecrementRes.ok) {
                    toast.success("Session Booked Successfully!");
                    
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                } else {
                    toast.error("Booking saved, but updating seat count ran into an error.");
                }
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
            {isSlotBlocked ? (
                <Button variant="flat" disabled className="bg-red-100 text-red-600 rounded-xl cursor-not-allowed font-medium px-6 py-3 w-full">
                    This session is fully booked. You can't join at the moment.
                </Button>
            ) : isDateBlocked ? (
                <Button variant="flat" disabled className="bg-amber-100 text-amber-700 rounded-xl cursor-not-allowed font-medium px-6 py-3 w-full">
                    Booking is closed (Date passed)
                </Button>
            ) : (
                <Button className="bg-[#BB6984] hover:bg-[#a3536d] text-white font-bold rounded-xl px-6 py-3 transition-colors w-full">
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
                                    <TextField defaultValue={studentName} name="studentName" >
                                        <Label>Student Name</Label>
                                        <Input className="rounded-2xl bg-gray-50" />
                                    </TextField>

                                    <TextField defaultValue={studentEmail} name="studentEmail" isReadOnly>
                                        <Label>Email Address</Label>
                                        <Input type="email" className="rounded-2xl bg-gray-50" />
                                    </TextField>

                                    <TextField defaultValue={tutorName} name="tutorName" isReadOnly>
                                        <Label>Assigned Tutor</Label>
                                        <Input className="rounded-2xl bg-gray-50" />
                                    </TextField>

                                    <TextField defaultValue={tutorId} name="tutorId" isReadOnly>
                                        <Label>Tutor ID Code</Label>
                                        <Input className="rounded-2xl bg-gray-50 text-xs text-gray-400" />
                                    </TextField>

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