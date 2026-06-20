"use client";

import React, { useState } from "react";
import {
    Button,
    Modal,
    Surface,
    TextField,
    Input,
    Label,
    FieldError
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FiEdit3 } from "react-icons/fi";

export function ProfileEditModal({ user }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    
const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const image = formData.get("image");
    // const email = formData.get("email");

    try {
        // 1. Update standard profile fields
        await authClient.updateUser({
            name: name,
            image: image,
        });

        // 2. Checking if email is different and call the specific email update method
        // if (email && email !== user.email) {
        //     await authClient.changeEmail({
        //         newEmail: email,
        //     });
        //     toast.info("A verification link has been sent to your new email.");
        // }

        toast.success("Profile updated successfully!");
        window.location.reload(); 
    } catch (err) {
        toast.error(err.message || "Failed to update profile");
    } finally {
        setIsSubmitting(false);
    }
};

    return (
        <Modal>
            <Button className="w-full py-4 bg-[#BB6984] hover:bg-[#a3536d] text-white font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2">
                <FiEdit3 size={18} /> Update Information
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit Profile</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="space-y-4">
                                    <TextField defaultValue={user?.name} name="name">
                                        <Label>Full Name</Label>
                                        <Input placeholder="Enter your name" className="rounded-2xl" />
                                        <FieldError />
                                    </TextField>

                                    {/* <TextField defaultValue={user?.email} name="email">
                                        <Label>Email Address</Label>
                                        <Input type="email" placeholder="Enter your email" className="rounded-2xl" />
                                        <FieldError />
                                    </TextField> */}

                                    <TextField defaultValue={user?.image} name="image">
                                        <Label>Photo URL</Label>
                                        <Input type="url" placeholder="Enter image link" className="rounded-2xl" />
                                        <FieldError />
                                    </TextField>

                                    <Button
                                        type="submit"
                                        isLoading={isSubmitting}
                                        className="w-full bg-[#BB6984] text-white font-bold rounded-2xl py-5 hover:bg-[#a3536d]"
                                    >
                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                    </Button>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}