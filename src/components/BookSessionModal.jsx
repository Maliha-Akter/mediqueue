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
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
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
                className={`font-bold rounded-xl px-6 py-3 transition-colors w-full ${isOwner ? "bg-gray-200 text-gray-500  cursor-not-allowed" :
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
                                        <TextField defaultValue={studentName} name="studentName">
                                            {/* Added dark:text-gray-200 to Label */}
                                            <Label className="dark:text-gray-200">Student Name</Label>
                                            {/* Updated Input to have dark background and text */}
                                            <Input className="rounded-2xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600" />
                                        </TextField>

                                        <TextField defaultValue={studentEmail} name="studentEmail" isReadOnly>
                                            <Label className="dark:text-gray-200">Email Address</Label>
                                            <Input type="email" className="rounded-2xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                                        </TextField>

                                        {/* Apply the same logic to the other fields: */}
                                        <TextField defaultValue={tutorName} name="tutorName" isReadOnly>
                                            <Label className="dark:text-gray-200">Assigned Tutor</Label>
                                            <Input className="rounded-2xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100" />
                                        </TextField>

                                        <TextField defaultValue={tutorId} name="tutorId" isReadOnly>
                                            <Label className="dark:text-gray-200">Tutor ID Code</Label>
                                            <Input className="rounded-2xl bg-gray-50 dark:bg-gray-800 text-xs text-gray-400 dark:text-gray-500" />
                                        </TextField>

                                        <TextField name="phone" isRequired>
                                            <Label className="dark:text-gray-200">Your Phone Number</Label>
                                            <Input placeholder="+880 1xxx-xxxxxx" className="rounded-2xl dark:bg-gray-800 dark:text-gray-100" />
                                            <FieldError />
                                        </TextField>

                                        <div className="pt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Remaining Slots Left: <span className="font-bold text-emerald-600 dark:text-emerald-400">{totalSlots}</span>
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