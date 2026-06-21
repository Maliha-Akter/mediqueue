'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const AvailableTeacher = () => {
    const [tutors, setTutors] = useState([]);
    const { data: session } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured-tutors`, { cache: 'no-store' });
                if (response.ok) {
                    const data = await response.json();
                    setTutors(data);
                }
            } catch (error) {
                console.error("Database fetch error:", error);
            }
        };
        fetchTutors();
    }, []);

    const handleBookSession = (tutorId) => {
        if (session) {
            router.push(`/tutors/${tutorId}`);
        } else {
            router.push(`/login?callbackUrl=/tutors/${tutorId}`);
        }
    };

    const cardColors = [
        'bg-[#AA4465]', 'bg-[#C96C88]', 'bg-[#D88AA2]',
        'bg-[#E6A9BB]', 'bg-[#F0BFD0]', 'bg-[#F7DDE7]',
    ];

    return (
        <section className="relative py-24 bg-gradient-to-b from-[#FFF5F8] to-white dark:from-gray-950 dark:to-gray-900 w-full min-h-screen transition-colors duration-500">   
        <div className="relative container mx-auto px-4 sm:px-6">

            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-xs font-bold text-[#AA4465] tracking-widest uppercase dark:text-white bg-[#AA4465]/10 border border-[#AA4465]/20 dark:border-white px-4 py-1.5 rounded-full">
                    Verified Team
                </span>
                <h2 className="text-3xl sm:text-4xl font-black dark:text-white text-gray-900 tracking-tight mt-4">
                    Available Expert Tutors
                </h2>
            </div>

            {/* Grid Layout */}
            {tutors.length === 0 ? (
                <div className="text-center bg-white border border-gray-100 rounded-3xl p-16 shadow-sm max-w-md mx-auto">
                    <p className="text-gray-500 text-lg">No active tutors found right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                    {tutors.map((tutor, index) => (
                        <div
                            key={tutor._id}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between h-full group hover:-translate-y-2 transition-all duration-300 ease-out mx-auto w-full max-w-[280px] sm:max-w-none"
                        >
                            <div className="flex flex-col flex-1">
                                <div className={`relative h-24 w-full ${cardColors[index % cardColors.length]}`} />
                                <div className="relative -mt-12 flex justify-center z-10">
                                    <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-100">
                                        <img src={tutor.photoUrl} alt={tutor.tutorName} className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div className="p-5 pt-4 text-center">
                                    <h3 className="text-base font-bold text-gray-900">{tutor.tutorName}</h3>
                                    <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-3 min-h-[48px]">
                                        {tutor.description ||
                                            <>
                                                Hi! I am a professional tutor specialized in <strong className='font-bold font-black'>{tutor.subject || 'various academic subjects'}</strong>.
                                                I am here to help you achieve your learning goals.
                                            </>
                                        }
                                    </p>
                                    <div className="mt-4 font-bold text-gray-800">${tutor.hourlyFee}/hr</div>
                                </div>
                            </div>

                            {/* Updated Booking Button */}
                            <div className="px-5 pb-5 pt-1">
                                <button
                                    onClick={() => handleBookSession(tutor._id)}
                                    className="block w-full text-center py-2.5 bg-[#AA4465] text-white font-bold text-xs rounded-lg hover:bg-[#8F3552] transition-all duration-200"
                                >
                                    Book Session
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
        </section>
    );
};

export default AvailableTeacher;