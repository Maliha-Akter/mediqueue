"use client";

import { AlertDialog, Button } from "@heroui/react";
import React from "react";
import { toast } from "react-toastify";

export function CancelSessionDialog({ booking, onCancelSuccess }) {
    const { _id, tutorName } = booking;

    const handleCancelSubmit = async () => {
        try {
            //  direct backend app.delete route
            const res = await fetch(`http://localhost:5000/booking/${_id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                toast.error(`Session with ${tutorName} removed successfully`);
                if (onCancelSuccess) {
                    onCancelSuccess(_id); // Removes the item from UI state
                }
            } else {
                toast.warning("Failed to clear session booking record.");
            }
        } catch (error) {
            console.error("Error executing session deletion:", error);
            toast.error("Network error while trying to cancel.");
        }
    };

    return (
        <AlertDialog>
            <Button 
                size="sm" 
                className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl transition-colors border border-red-100"
            >
                Cancel Session
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Cancel Appointment?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                Are you sure you want to cancel your session with <strong>{tutorName}</strong>? 
                                This will permanently delete the booking record.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary" className="rounded-xl">
                                Keep Session
                            </Button>
                            <Button onClick={handleCancelSubmit} slot="close" variant="danger" className="rounded-xl">
                                Confirm Cancellation
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}

export default CancelSessionDialog;