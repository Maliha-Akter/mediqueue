// import { auth } from '@/lib/auth';
import  DeleteDialog  from '@/components/DeleteDialog'; 
import { Button } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LuMapPin } from 'react-icons/lu';
import { FaRegClock, FaBookOpen, FaUniversity, FaChalkboardTeacher } from 'react-icons/fa';
import { FiChevronLeft, FiPhone, FiMail } from 'react-icons/fi';
import EditModal from '@/components/EditModal';



const TutorDetailsPage = async ({ params }) => {
    const { id } = await params;
    
    // const { token } = await auth.api.getToken({
    //     headers: await headers()
    // });

    const res = await fetch(`http://localhost:5000/tutor/${id}`);
    const tutor = await res.json();

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

    const fallbackImage = "/assets/alt-user.png";
    const profileSrc = photoUrl || fallbackImage;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#CC8FA3]/20 via-gray-50 to-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Action Part */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    {/* Back Link */}
                    <Link 
                        href="/tutors" 
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#BB6984] hover:underline"
                    >
                        <FiChevronLeft /> Back to Directory
                    </Link>

                    {/* Management Actions (Edit/Delete Modals) */}
                    <div className="flex justify-end items-center gap-2 w-full sm:w-auto">
                        <EditModal tutor={tutor} />
                        <DeleteDialog tutor={tutor} />
                    </div>
                </div>

                {/* 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Column  */}
                    <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        
                        <div className="relative w-full h-80 sm:h-96 bg-gray-50 rounded-t-3xl overflow-hidden flex items-center justify-center">
                            <div className="relative w-full h-full p-6">
                                <Image
                                    src={profileSrc}
                                    alt={tutorName}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Text & Informational Details  */}
                        <div className="p-6 sm:p-8 space-y-6">
                            
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#BB6984]">
                                    <FaBookOpen size={13} />
                                    <span>{subject} Specialist</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                                    {tutorName}
                                </h1>
                                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-gray-500 font-medium text-sm pt-1">
                                    <div className="flex items-center gap-1.5">
                                        <FaUniversity className="text-gray-400 shrink-0" size={16} />
                                        <span>{institution}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <LuMapPin className="text-gray-400 shrink-0" size={16} />
                                        <span>{location}</span>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Scheduling Availability & Teaching Mode Part */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-gray-900">Schedule Details</h3>
                                    <div className="flex items-start gap-3 bg-gray-50 rounded-2xl p-4 text-gray-700 text-sm h-full">
                                        <FaRegClock className="text-[#BB6984] shrink-0 mt-0.5" size={16} />
                                        <div>
                                            <p className="font-bold text-gray-900">{availableDays}</p>
                                            <p className="text-gray-500 text-xs mt-0.5">{availableTimeSlot}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="text-lg font-bold text-gray-900">Teaching Setup</h3>
                                    <div className="flex items-start gap-3 bg-gray-50 rounded-2xl p-4 text-gray-700 text-sm h-full">
                                        <FaChalkboardTeacher className="text-[#BB6984] shrink-0 mt-0.5" size={16} />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Preferred Mode</p>
                                            <p className="font-bold text-gray-900 text-base mt-0.5 capitalize">{teachingMode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Professional Biography  */}
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-gray-900">About the Tutor</h3>
                                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                    {description || `Welcome to my profile! I am an academic specialist dedicated to supporting students in mastering ${subject}. With foundational tracking methods from ${institution}, I construct curated approaches to help achieve performance breakthroughs.`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column  */}
                    <div className="space-y-6 lg:sticky lg:top-36">
                        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Hourly Rate</p>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-4xl font-black text-gray-900">${hourlyFee}</span>
                                    <span className="text-sm font-bold text-gray-400 uppercase">/ hour</span>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Contact Panel */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Direct Contacts</h4>
                                <div className="space-y-2.5 text-sm text-gray-600">
                                    <div className="flex items-center gap-3">
                                        <FiMail className="text-gray-400" size={16} />
                                        <span className="truncate">{email || "contact@tutorplatform.com"}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FiPhone className="text-gray-400" size={16} />
                                        <span>{phone || "+880 1700-000000"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking Action  */}
                            <Button
                                className="w-full font-bold text-md bg-[#BB6984] text-white hover:bg-[#a3536d] transition-colors duration-200 shadow-md py-6 rounded-2xl"
                            >
                                Request Session Placement
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TutorDetailsPage;