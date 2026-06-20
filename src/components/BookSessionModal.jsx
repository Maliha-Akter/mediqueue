"use client";
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

export function BookSessionModal({ tutor, currentUser }) {
    // 1. State to manage modal visibility
    const [isOpen, setIsOpen] = useState(false);

    const {
        _id: tutorId,
        tutorName,
        totalSlots,
        sessionStartDate,
        userId: tutorOwnerId 
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

    // Rules
    const isOwner = currentUser?.id === tutorOwnerId;
    const isDateBlocked = targetSessionDate && today < targetSessionDate;
    const isSlotBlocked = totalSlots <= 0;

    // 2. Logic to handle the click safely
    const handleOpen = () => {
        if (isOwner) {
            toast.error("You cannot book your own tutor profile.");
        } else if (isSlotBlocked) {
            toast.error("This session is fully booked.");
        } else if (isDateBlocked) {
            toast.error("Booking is not available yet for this tutor.");
        } else {
            setIsOpen(true);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { data: tokenData } = await authClient.token();

        const bookingPayload = {
            tutorId, tutorName, studentName, studentEmail,
            userId: studentUserId, phone: formData.get("phone"),
            bookingStatus: "booked", bookedAt: new Date().toISOString()
        };

        try {
            const res = await fetch("http://localhost:5000/booking", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(bookingPayload),
            });

            if (res.ok) {
                toast.success("Session Booked Successfully!");
                setIsOpen(false);
                setTimeout(() => window.location.reload(), 1500);
            } else {
                const errData = await res.json();
                toast.error(errData.message || "Failed to book session.");
            }
        } catch (error) {
            toast.error("Connection error while scheduling.");
        }
    };

    return (
        <>
            {/* 3. The Trigger Button: Controlled by our logic */}
            <Button
                onClick={handleOpen}
                disabled={isOwner || isSlotBlocked || isDateBlocked}
                className={`font-bold rounded-xl px-6 py-3 transition-colors w-full ${
                    isOwner ? "bg-gray-200 text-gray-500 cursor-not-allowed" :
                    isSlotBlocked ? "bg-red-200 text-red-600 cursor-not-allowed" :
                    isDateBlocked ? "bg-amber-100 text-amber-700 cursor-not-allowed" :
                    "bg-[#BB6984] hover:bg-[#a3536d] text-white"
                }`}
            >
                {isOwner ? "You own this profile" : 
                 isSlotBlocked ? "Fully Booked" :
                 isDateBlocked ? "Booking not available yet" : "Book Session"}
            </Button>

            {/* 4. Modal controlled by isOpen state */}
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
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
                                            <Button type="submit" className="w-full bg-[#BB6984] text-white font-bold rounded-2xl py-4">
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
        </>
    );
}

export default BookSessionModal;