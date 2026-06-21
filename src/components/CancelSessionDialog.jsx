"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import React from "react";
import { toast } from "react-toastify";

export function CancelSessionDialog({ booking, onCancelSuccess }) {
    const { _id, tutorName } = booking;

    const handleCancelSubmit = async () => {
        const { data: tokenData } = await authClient.token();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/cancel/${_id}`, {
                method: "PATCH",
                headers: { "content-type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                 }
            });

            if (res.ok) {
                toast.success(`Session with ${tutorName} has been cancelled`);
                if (onCancelSuccess) {
                    onCancelSuccess(_id); 
                }
            } else {
                toast.warning("Failed to cancel session.");
            }
        } catch (error) {
            console.error("Error executing session cancellation:", error);
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
                                The status will be updated to cancelled.
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