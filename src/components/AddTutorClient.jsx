"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    FieldError,
    Input,
    Label,
    ListBox,
    TextArea,
    TextField,
    Select,
    Card
} from '@heroui/react';

import {
    FaUserGraduate,
    FaBookOpen,
    FaDollarSign,
    FaClock,
    FaMapMarkerAlt,
    FaLaptopHouse,
    FaImage,
    FaCalendarAlt,
    FaThList,
    FaUniversity,
    FaBriefcase
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';


const AddTutorClient = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Getting active user identity (*session mainly)
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const activeUserId = user?.id || user?._id;

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!activeUserId) {
            toast.error("You must be logged in to create a listing.");
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const formFields = Object.fromEntries(formData.entries());

        const tutorData = {
            ...formFields,
            userId: activeUserId
        };

        console.log("Submitting updated payload:", tutorData);
        const { data: tokenData } = await authClient.token();
        try {
            const res = await fetch('http://localhost:5000/tutor', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${tokenData?.token}`
                },
                body: JSON.stringify(tutorData),
            });

            const data = await res.json();
            console.log("Server response acknowledgment:", data);

            if (res.ok) {
                toast.success("Successfully Added Profile Layout");
                router.push('/tutors');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Failed to sync structural listing context");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Tutor Profile Onboarding
                    </h1>
                    <p className="text-base text-gray-500 dark:text-gray-400">
                        Complete your academic structural credentials and operational schedule layout.
                    </p>
                </div>

                {/* FORM CONTAINER */}
                <Card className="border border-gray-200/60 shadow-xl bg-white rounded-2xl">
                    <form onSubmit={onSubmit} className="p-6 md:p-10 space-y-8">

                        {/* SECTION 1: IDENTITY & MEDIA */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
                                1. Identity & Profile Assets
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <TextField name="tutorName" isRequired>
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaUserGraduate className="text-gray-400" size={14} /> Tutor Name
                                        </Label>
                                        <Input placeholder="e.g., Dr. Sarah Jenkins" className="rounded-xl shadow-sm" />
                                        <FieldError className="text-xs text-rose-500 mt-1" />
                                    </TextField>
                                </div>

                                <div className="md:col-span-2">
                                    <TextField name="photoUrl" isRequired>
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaImage className="text-gray-400" size={14} /> Photo URL (imgbb / postimage link)
                                        </Label>
                                        <Input
                                            type="url"
                                            placeholder="https://i.ibb.co/your-image-hash/profile.jpg"
                                            className="rounded-xl shadow-sm"
                                        />
                                        <FieldError className="text-xs text-rose-500 mt-1" />
                                    </TextField>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: SPECIALIZATION & REGION */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
                                2. Specialization & Mode
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Select
                                        name="subject"
                                        isRequired
                                        className="w-full"
                                        placeholder="Select Field"
                                    >
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaBookOpen className="text-gray-400" size={14} /> Subject / Category
                                        </Label>
                                        <Select.Trigger className="rounded-xl shadow-sm">
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

                                <div>
                                    <Select
                                        name="teachingMode"
                                        isRequired
                                        className="w-full"
                                        placeholder="Select Mode"
                                    >
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaLaptopHouse className="text-gray-400" size={14} /> Teaching Mode
                                        </Label>
                                        <Select.Trigger className="rounded-xl shadow-sm">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                {['Online', 'Offline', 'Both'].map((mode) => (
                                                    <ListBox.Item key={mode} id={mode} textValue={mode}>
                                                        {mode} <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                ))}
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                <div className="md:col-span-2">
                                    <TextField name="location" isRequired>
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaMapMarkerAlt className="text-gray-400" size={14} /> Location (Area / City)
                                        </Label>
                                        <Input placeholder="e.g., Dhanmondi, Dhaka" className="rounded-xl shadow-sm" />
                                        <FieldError className="text-xs text-rose-500 mt-1" />
                                    </TextField>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 3: AVAILABILITY & SCHEDULING DETAILS */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
                                3. Availability Matrix & Terms
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Select
                                        name="availableDays"
                                        isRequired
                                        className="w-full"
                                        placeholder="Select Available Days"
                                    >
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaClock className="text-gray-400" size={14} /> Available Days
                                        </Label>
                                        <Select.Trigger className="rounded-xl shadow-sm">
                                            <Select.Value />
                                            <Select.Indicator />
                                        </Select.Trigger>
                                        <Select.Popover>
                                            <ListBox>
                                                <ListBox.Item id="Sun - Thu" textValue="Sun - Thu">Sun - Thu (Regular Weekdays)</ListBox.Item>
                                                <ListBox.Item id="Fri - Sat" textValue="Fri - Sat">Fri - Sat (Weekends Only)</ListBox.Item>
                                                <ListBox.Item id="Mon - Wed - Fri" textValue="Mon - Wed - Fri">Mon - Wed - Fri (Alternate Days)</ListBox.Item>
                                                <ListBox.Item id="Tue - Thu - Sat" textValue="Tue - Thu - Sat">Tue - Thu - Sat (Alternate Days)</ListBox.Item>
                                                <ListBox.Item id="Everyday" textValue="Everyday">Everyday Availability</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                <div>
                                    <Select
                                        name="availableTimeSlot"
                                        isRequired
                                        className="w-full"
                                        placeholder="Select Time Window"
                                    >
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaClock className="text-gray-400" size={14} /> Available Time Slot
                                        </Label>
                                        <Select.Trigger className="rounded-xl shadow-sm">
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

                                <div>
                                    <TextField name="sessionStartDate" type="date" isRequired>
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaCalendarAlt className="text-gray-400" size={14} /> Session Start Date
                                        </Label>
                                        <Input type="date" className="rounded-xl shadow-sm" />
                                        <FieldError className="text-xs text-rose-500 mt-1" />
                                    </TextField>
                                </div>

                                <div>
                                    <TextField name="hourlyFee" type="number" isRequired>
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaDollarSign className="text-gray-400" size={14} /> Hourly Fee (USD)
                                        </Label>
                                        <Input type="number" placeholder="40" className="rounded-xl shadow-sm" />
                                        <FieldError className="text-xs text-rose-500 mt-1" />
                                    </TextField>
                                </div>

                                <div className="md:col-span-2">
                                    <TextField name="totalSlots" type="number" isRequired>
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaThList className="text-gray-400" size={14} /> Total Slot
                                        </Label>
                                        <Input type="number" placeholder="6" className="rounded-xl shadow-sm" />
                                        <FieldError className="text-xs text-rose-500 mt-1" />
                                    </TextField>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 4: INSTITUTION & EXPERIENCE */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
                                4. Academic Background & Qualifications
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <TextField name="institution" isRequired>
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaUniversity className="text-gray-400" size={14} /> Institution
                                        </Label>
                                        <Input placeholder="e.g., University of Oxford / MIT" className="rounded-xl shadow-sm" />
                                        <FieldError className="text-xs text-rose-500 mt-1" />
                                    </TextField>
                                </div>

                                <div className="md:col-span-2">
                                    <TextField name="experience" isRequired>
                                        <Label className="text-gray-700 font-medium text-sm flex items-center gap-2 mb-1">
                                            <FaBriefcase className="text-gray-400" size={14} /> Professional Experience Detail
                                        </Label>
                                        <TextArea
                                            placeholder="e.g., 5+ years instructing Advanced Placement (AP) calculus courses..."
                                            className="rounded-xl shadow-sm min-h-[120px]"
                                        />
                                        <FieldError className="text-xs text-rose-500 mt-1" />
                                    </TextField>
                                </div>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-4 border-t border-gray-100">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                className="w-full bg-[#7A3048] hover:bg-[#63273a] text-white font-semibold text-md py-6 rounded-xl shadow-md transition-all duration-200"
                            >
                                {isSubmitting ? "Processing Application..." : "Publish Professional Profile"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddTutorClient;