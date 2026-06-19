"use client";

import React, { useState } from "react";
import { 
    Button, 
    FieldError, 
    Input, 
    Label, 
    ListBox, 
    Modal, 
    Surface, 
    TextArea, 
    TextField, 
    Select 
} from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";

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
        sessionStartDate,
        hourlyFee,
        totalSlots,
        institution,
        experience
    } = tutor;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

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
            const data = await res.json();
            console.log("Server Acknowledgement:", data);

            if (res.ok) {
                toast.success("Tutor Profile Updated successfully!");
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error("Failed to update tutor profile.");
            }
        } catch (error) {
            console.error("Error updating tutor:", error);
            toast.error("An error occurred while saving.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal>
            <Button variant="outline" className="rounded-xl inline-flex items-center gap-1 border-gray-200 text-gray-700 hover:bg-gray-50">
                <BiEdit size={16} /> Edit Profile
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl">
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
                                                <Input placeholder="Tutor Name" className="rounded-2xl" />
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

                                        {/* Subject / Category Dropdown Setup */}
                                        <div>
                                            <Select
                                                defaultValue={subject}
                                                name="subject"
                                                className="w-full"
                                                placeholder="Select Subject"
                                            >
                                                <Label>Subject Specialist</Label>
                                                <Select.Trigger className="rounded-2xl">
                                                    <Select.Value />
                                                    <Select.Indicator />
                                                </Select.Trigger>
                                                <Select.Popover>
                                                    <ListBox>
                                                        {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Language Arts'].map((sub) => (
                                                            <ListBox.Item key={sub} id={sub} textValue={sub}>
                                                                {sub} <ListBox.ItemIndicator />
                                                            </ListBox.Item>
                                                        ))}
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Teaching Mode Dropdown */}
                                        <div>
                                            <Select
                                                defaultValue={teachingMode || "Online"}
                                                name="teachingMode"
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
                                                        <ListBox.Item id="Online" textValue="Online">Online <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="Offline" textValue="Offline">Offline <ListBox.ItemIndicator /></ListBox.Item>
                                                        <ListBox.Item id="Both" textValue="Both">Both <ListBox.ItemIndicator /></ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Location */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={location} name="location" isRequired>
                                                <Label>Location / City</Label>
                                                <Input placeholder="Location Area" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Available Days Dropdown Selection */}
                                        <div>
                                            <Select
                                                defaultValue={availableDays}
                                                name="availableDays"
                                                className="w-full"
                                                placeholder="Select Days"
                                            >
                                                <Label>Available Days</Label>
                                                <Select.Trigger className="rounded-2xl">
                                                    <Select.Value />
                                                    <Select.Indicator />
                                                </Select.Trigger>
                                                <Select.Popover>
                                                    <ListBox>
                                                        <ListBox.Item id="Sun - Thu" textValue="Sun - Thu">Sun - Thu</ListBox.Item>
                                                        <ListBox.Item id="Fri - Sat" textValue="Fri - Sat">Fri - Sat</ListBox.Item>
                                                        <ListBox.Item id="Mon - Wed - Fri" textValue="Mon - Wed - Fri">Mon - Wed - Fri</ListBox.Item>
                                                        <ListBox.Item id="Tue - Thu - Sat" textValue="Tue - Thu - Sat">Tue - Thu - Sat</ListBox.Item>
                                                        <ListBox.Item id="Everyday" textValue="Everyday">Everyday</ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Available Time Slot Dropdown Selection */}
                                        <div>
                                            <Select
                                                defaultValue={availableTimeSlot}
                                                name="availableTimeSlot"
                                                className="w-full"
                                                placeholder="Select Time Slot"
                                            >
                                                <Label>Available Time Slot</Label>
                                                <Select.Trigger className="rounded-2xl">
                                                    <Select.Value />
                                                    <Select.Indicator />
                                                </Select.Trigger>
                                                <Select.Popover>
                                                    <ListBox>
                                                        <ListBox.Item id="09:00 AM - 12:00 PM" textValue="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</ListBox.Item>
                                                        <ListBox.Item id="02:00 PM - 05:00 PM" textValue="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</ListBox.Item>
                                                        <ListBox.Item id="05:00 PM - 08:00 PM" textValue="05:00 PM - 08:00 PM">Evening (05:00 PM - 08:00 PM)</ListBox.Item>
                                                        <ListBox.Item id="08:00 PM - 11:00 PM" textValue="08:00 PM - 11:00 PM">Night (08:00 PM - 11:00 PM)</ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Session Start Date */}
                                        <div>
                                            <TextField defaultValue={sessionStartDate} name="sessionStartDate" type="date" isRequired>
                                                <Label>Session Start Date</Label>
                                                <Input type="date" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Hourly Fee Rate */}
                                        <div>
                                            <TextField defaultValue={hourlyFee} name="hourlyFee" type="number" isRequired>
                                                <Label>Hourly Rate ($)</Label>
                                                <Input type="number" placeholder="Hourly Fee" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Total Slots */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={totalSlots} name="totalSlots" type="number" isRequired>
                                                <Label>Total Target Slots Available</Label>
                                                <Input type="number" placeholder="Total Slots" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Photo URL */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={photoUrl} name="photoUrl" isRequired>
                                                <Label>Profile Image URL</Label>
                                                <Input type="url" placeholder="Photo URL Link" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Experience Details Biography */}
                                        <div className="md:col-span-2">
                                            <TextField defaultValue={experience} name="experience" isRequired>
                                                <Label>Professional Experience & Bio</Label>
                                                <TextArea
                                                    placeholder="Describe your background and qualifications details here..."
                                                    className="rounded-3xl min-h-[100px]"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    {/* Action Footers Panel */}
                                    <Modal.Footer className="px-0 pt-4">
                                        <Button
                                            type="submit"
                                            isLoading={isSubmitting}
                                            className="w-full bg-[#BB6984] text-white font-bold rounded-2xl py-5 hover:bg-[#a3536d] transition-colors"
                                        >
                                            {isSubmitting ? "Saving Real-Time Form context..." : "Save Changes"}
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