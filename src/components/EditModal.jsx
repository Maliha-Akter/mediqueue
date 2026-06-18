"use client";

import { Button, FieldError, Input, Label, ListBox, Modal, Surface, TextArea, TextField, Select } from "@heroui/react";
import React from "react";
import { BiEdit } from "react-icons/bi";
// import { toast } from "react-toastify";

export function EditModal({ tutor }) {
    const { 
        _id, 
        tutorName, 
        photoUrl, 
        subject, 
        teachingMode, 
        location, 
        availableDays, 
        availableTimeSlot, 
        hourlyFee, 
        institution,
        description, 
        email,
        phone 
    } = tutor;

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedTutorData = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`http://localhost:5000/tutor/${_id}`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedTutorData),
            });
            
            if (res.ok) {
                // toast.success("Tutor Profile Updated successfully!");
            } else {
                // toast.error("Failed to update tutor profile.");
            }
        } catch (error) {
            console.error("Error updating tutor:", error);
            // toast.error("An error occurred while saving.");
        }
    };

    return (
        <Modal>
            <Button variant="outline" className="rounded-xl inline-flex items-center gap-1 border-gray-200 text-gray-700 hover:bg-gray-50">
                <BiEdit size={16} /> Edit Profile
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit Tutor Profile</Modal.Heading>
                        </Modal.Header>
                        
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        
                                        {/* Tutor Name */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={tutorName} name="tutorName" isRequired>
                                                <Label>Full Name</Label>
                                                <Input placeholder="Maliha Akter" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Institution */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={institution} name="institution" isRequired>
                                                <Label>Institution</Label>
                                                <Input placeholder="University Name" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Subject */}
                                        <TextField defaultValue={subject} name="subject" isRequired>
                                            <Label>Subject Specialist</Label>
                                            <Input placeholder="Computer Science" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Teaching Mode Setup Selection */}
                                        <div>
                                            <Select
                                                defaultValue={teachingMode}
                                                name="teachingMode"
                                                isRequired
                                                className="w-full"
                                                placeholder="Select Mode"
                                            >
                                                <Label>Teaching Setup Mode</Label>
                                                <Select.Trigger className="rounded-2xl">
                                                    <Select.Value />
                                                    <Select.Indicator />
                                                </Select.Trigger>
                                                <Select.Popover>
                                                    <ListBox>
                                                        <ListBox.Item id="online" textValue="Online">Online <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="offline" textValue="Offline">Offline <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="hybrid" textValue="Hybrid">Hybrid <ListBox.ItemIndicator /></ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Location */}
                                        <TextField defaultValue={location} name="location" isRequired>
                                            <Label>Location / City</Label>
                                            <Input placeholder="Dhaka, Bangladesh" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Hourly Fee Rate */}
                                        <TextField defaultValue={hourlyFee} name="hourlyFee" type="number" isRequired>
                                            <Label>Hourly Rate ($)</Label>
                                            <Input type="number" placeholder="30" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Available Days */}
                                        <TextField defaultValue={availableDays} name="availableDays" isRequired>
                                            <Label>Available Days</Label>
                                            <Input placeholder="Sat, Mon, Wed" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Available Time Slot */}
                                        <TextField defaultValue={availableTimeSlot} name="availableTimeSlot" isRequired>
                                            <Label>Available Time Slot</Label>
                                            <Input placeholder="4:00 PM - 6:00 PM" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Profile Contact Email */}
                                        <TextField defaultValue={email} name="email" type="email" isRequired>
                                            <Label>Contact Email</Label>
                                            <Input type="email" placeholder="tutor@example.com" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Contact Phone */}
                                        <TextField defaultValue={phone} name="phone" isRequired>
                                            <Label>Contact Phone</Label>
                                            <Input placeholder="+880 1700-000000" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Photo URL */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={photoUrl} name="photoUrl">
                                                <Label>Profile Image URL</Label>
                                                <Input type="url" placeholder="https://example.com/photo.jpg" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Professional Description Biography */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={description} name="description" isRequired>
                                                <Label>About Biography / Overview</Label>
                                                <TextArea
                                                    placeholder="Describe your structural teaching methods and academic background experience..."
                                                    className="rounded-3xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    {/* Action Footers Panel */}
                                    <Modal.Footer className="px-0 pt-4">
                                        <Button 
                                            type="submit" 
                                            slot="close"
                                            className="w-full bg-[#BB6984] text-white font-bold rounded-2xl py-5 hover:bg-[#a3536d] transition-colors"
                                        >
                                            Save Changes
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

export default EditModal;