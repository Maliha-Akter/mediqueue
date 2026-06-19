import TutorCard from '@/components/TutorCard';
import React from 'react';

const TutorPage = async () => {
    // Fetching data directly from backend server
    const res = await fetch('http://localhost:5000/tutor', { cache: 'no-store' });
    const tutors = await res.json();

    return (
        <div className="min-h-screen bg-[#AA4465] transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                
                {/* Header Content Section */}
                <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-xs font-bold tracking-wider uppercase text-white">
                        Expert Directory
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl drop-shadow-sm">
                        All Available Tutors
                    </h1>
                    <div className="w-16 h-1 bg-white/60 mx-auto rounded-full mt-2" />
                    <p className="text-base sm:text-lg text-rose-50/90 font-medium pt-1">
                        Explore and connect with verified, world-class academic specialists.
                    </p>
                </div>

                {/*card structure */}
                {tutors?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {tutors.map(tutor => (
                            <TutorCard key={tutor._id || tutor.tutorName} tutor={tutor} />
                        ))}
                    </div>
                ) : (
                    /* If no tutor found */
                    <div className="text-center py-20 bg-white/10 border border-dashed border-white/20 rounded-3xl backdrop-blur-sm">
                        <p className="text-white font-medium">No tutors found at the moment.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default TutorPage;