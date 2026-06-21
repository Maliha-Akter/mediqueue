"use client";

import { authClient } from "@/lib/auth-client";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

export function DeleteDialog({ tutor }) {
    const { _id, tutorName } = tutor;
    const router = useRouter();

    const handleDelete = async () => {
        const { data: tokenData } = await authClient.token();
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/tutor/${_id}`, {
                method: "DELETE",
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Delete response:", data);
                
                toast.error(`Tutor profile for ${tutorName} deleted successfully`);
                
                // router.push('/tutors');
                // router.refresh();
                window.location.reload();
            } else {
                console.error("Failed to delete tutor profile");
                toast.warning("Failed to remove tutor profile.");
            }
        } catch (error) {
            console.error("Error deleting tutor:", error);
        }
    };

    return (
        <AlertDialog>
            <Button className="text-red-500 rounded-xl mt-5 mb-3 ml-2 border-red-200 hover:bg-red-50" variant="outline">
                <TrashBin /> Delete Profile
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Tutor Profile permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently remove <strong>{tutorName}</strong> from the roster 
                                and remove all matching tutor registration data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary" className="rounded-xl dark:text-white">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} slot="close" variant="danger" className="rounded-xl">
                                Delete Tutor
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}

export default DeleteDialog;