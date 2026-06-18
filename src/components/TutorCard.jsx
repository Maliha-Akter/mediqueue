import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@heroui/react';
import { FiExternalLink } from 'react-icons/fi';
import { LuMapPin } from 'react-icons/lu';
import { FaRegClock } from 'react-icons/fa6'; 
import { FaBookOpen, FaUniversity } from 'react-icons/fa';

const TutorCard = ({ tutor }) => {
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
        institution
    } = tutor;

    return (
        <div className="group flex flex-col h-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-gray-300/40">

            {/* Media Header & Badge Section */}
            <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden bg-gray-50 rounded-t-2xl">
                <Image
                    src={photoUrl || "/assets/alt-user.png"} 
                    alt={tutorName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {/* Teaching Mode Badge */}
                <div className="absolute top-3 left-3 z-20 flex gap-2">
                    <span className="rounded-lg bg-white/95 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow-sm backdrop-blur-sm border border-gray-100">
                        {teachingMode}
                    </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex-1 space-y-3">

                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#BB6984]">
                        <FaBookOpen size={12} />
                        <span>{subject}</span>
                    </div>

                    {/* Main Name & Pricing Breakdown */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                            {/* Title Hover State changed to match theme */}
                            <h2 className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-[#BB6984] line-clamp-1">
                                {tutorName}
                            </h2>
                            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                                <FaUniversity className="text-gray-400 shrink-0" size={14} />
                                <span className="line-clamp-1">{institution}</span>
                            </div>
                        </div>

                        <div className="text-right shrink-0">
                            <h3 className="text-2xl font-black text-gray-900">${hourlyFee}</h3>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">per hour</p>
                        </div>
                    </div>

                    {/* Logistics & Scheduling details */}
                    <div className="space-y-2 pt-3 border-t border-gray-100 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <FaRegClock className="text-gray-400 shrink-0" size={14} />
                            <span className="truncate font-medium text-gray-700">
                                {availableDays} • <span className="text-gray-500 font-normal">{availableTimeSlot}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <LuMapPin className="text-gray-400 shrink-0" size={14} />
                            <span className="truncate text-gray-500">{location}</span>
                        </div>
                    </div>
                </div>

                {/* Action Button Link  */}
                <div className="mt-5 pt-3 border-t border-gray-100">
                    <Link href={`/tutors/${_id}`} className="w-full block">
                        <Button
                            variant="flat"
                            className="w-full font-semibold text-md bg-[#BB6984]/10 text-[#BB6984] hover:bg-[#BB6984] hover:text-white transition-all duration-200 rounded-xl py-5"
                        >
                            <FiExternalLink /> View Full Profile
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TutorCard;