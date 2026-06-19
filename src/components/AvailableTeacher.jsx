import React from 'react';
import Link from 'next/link';

const AvailableTeacher = async () => {
    let tutors = [];

    try {
        const response = await fetch('http://localhost:5000/featured-tutors', { cache: 'no-store' });
        if (response.ok) {
            tutors = await response.json();
        }
    } catch (error) {
        console.error("Database fetch error:", error);
    }

    const cardColors = [
        'bg-[#AA4465]',
        'bg-[#C96C88]',
        'bg-[#D88AA2]',
        'bg-[#E6A9BB]',
        'bg-[#F0BFD0]',
        'bg-[#F7DDE7]',
    ];

    return (
        <section className="relative py-24 bg-gradient-to-b from-[#FFF5F8] to-white w-full min-h-screen">
            <div className="relative container mx-auto px-4 sm:px-6">
                
                {/* Header Section */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-bold text-[#AA4465] tracking-widest uppercase bg-[#AA4465]/10 border border-[#AA4465]/20 px-4 py-1.5 rounded-full">
                        Verified Team
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mt-4">
                        Available Expert Tutors
                    </h2>
                    <p className="mt-3 text-base text-gray-500 leading-relaxed">
                        Learn from top-tier academic professionals tailored around your goals.
                    </p>
                </div>

                {/* Grid Layout Container — max-w-5xl keeps the 3 cards compact and slim */}
                {tutors.length === 0 ? (
                    <div className="text-center bg-white border border-gray-100 rounded-3xl p-16 shadow-sm max-w-md mx-auto">
                        <p className="text-gray-500 text-lg">No active tutors found right now.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
                        {tutors.map((tutor, index) => {
                            const topBannerColor = cardColors[index % cardColors.length];

                            return (
                                <div 
                                    key={tutor._id} 
                                    className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col justify-between h-full group hover:-translate-y-2 transition-all duration-300 ease-out"
                                >
                                    <div className="flex flex-col flex-1">
                                        
                                        {/* 1. Split Top Banner Section */}
                                        <div className={`relative h-24 w-full ${topBannerColor} transition-colors duration-300`}>
                                            <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold font-mono">
                                                +
                                            </div>
                                        </div>

                                        {/* 2. Overlapping Profile Avatar Image Wrapper */}
                                        <div className="relative -mt-12 flex justify-center z-10">
                                            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-sm">
                                                <img 
                                                    src={tutor.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"} 
                                                    alt={tutor.tutorName}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        </div>

                                        {/* 3. Text Info Content Area */}
                                        <div className="p-5 pt-4 text-center flex flex-col flex-1 justify-between">
                                            <div>
                                                {/* Subject Tag */}
                                                <span className="text-[10px] font-bold text-[#AA4465] uppercase tracking-widest bg-[#AA4465]/10 px-2.5 py-0.5 rounded border border-[#AA4465]/20">
                                                    {tutor.subject || 'General'}
                                                </span>
                                                
                                                {/* Tutor Name */}
                                                <h3 className="text-base font-bold text-gray-900 mt-2 tracking-tight line-clamp-1">
                                                    {tutor.tutorName}
                                                </h3>
                                                
                                                {/* Description */}
                                                <p className="mt-2 text-xs text-gray-500 leading-relaxed line-clamp-3 min-h-[48px]">
                                                    {tutor.description || `Hi! I am specialized in teaching ${tutor.subject || 'various subjects'} online and offline.`}
                                                </p>
                                            </div>

                                            {/* Hourly pricing row */}
                                            <div className="mt-4 text-sm font-bold text-gray-800">
                                                ${tutor.price || 25}<span className="text-xs text-gray-400 font-normal">/hr</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. Action Booking Button */}
                                    <div className="px-5 pb-5 pt-1">
                                        <Link
                                            href={`/tutors/${tutor._id}`}
                                            className="block w-full text-center py-2.5 bg-[#AA4465] border border-[#AA4465] text-white font-bold text-xs rounded-lg hover:bg-[#8F3552] hover:border-[#8F3552] transition-all duration-200"
                                        >
                                            Book Session
                                        </Link>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AvailableTeacher;