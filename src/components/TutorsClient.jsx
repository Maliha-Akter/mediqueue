"use client";
import React, { useState, useEffect } from 'react';
import TutorCard from './TutorCard';
export const metadata = {
  title: "Tutors", 
};
const TutorsClient = () => {
    const [tutors, setTutors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const res = await fetch('http://localhost:5000/tutor');
                const data = await res.json();
                setTutors(data);
            } catch (error) {
                console.error("Error fetching tutors:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTutors();
    }, []);

    const filteredTutors = tutors.filter(tutor => {
        const matchesName = tutor.tutorName?.toLowerCase().includes(searchTerm.toLowerCase());
        const sessionDate = new Date(tutor.sessionStartDate);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const matchesDate =
            (!start || sessionDate >= start) &&
            (!end || sessionDate <= end);

        return matchesName && matchesDate;
    });

    return (
        <div className="min-h-screen bg-[#AA4465] dark:bg-gray-950 py-16 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Content Section (Kept intact) */}
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

                {/* Search & Filter Feature Section */}
                <div className="max-w-6xl mx-auto mb-12 p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl flex flex-wrap gap-4 items-end shadow-xl transition-colors duration-300">
                    <div className="flex-1 min-w-[200px]">
                        <label className="text-sm font-bold block mb-1 text-gray-700 dark:text-gray-300">
                            Search Tutor
                        </label>
                        <input
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg focus:ring-2 focus:ring-[#AA4465] outline-none transition-all"
                            placeholder="Search tutor by name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="w-[180px]">
                        <label className="text-sm font-bold block mb-1 text-gray-700 dark:text-gray-300">Start Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg focus:ring-2 focus:ring-[#AA4465] outline-none transition-all"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="w-[180px]">
                        <label className="text-sm font-bold block mb-1 text-gray-700 dark:text-gray-300">End Date</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-lg focus:ring-2 focus:ring-[#AA4465] outline-none transition-all"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setStartDate("");
                            setEndDate("");
                        }}
                        className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-6 py-2 rounded-lg font-bold text-gray-700 dark:text-gray-300 transition-all"
                    >
                        Reset
                    </button>
                </div>

                {/* Grid display */}
                {isLoading ? (
                    <div className="text-center text-white py-10 font-bold">Loading...</div>
                ) : filteredTutors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {filteredTutors.map((tutor) => (
                            <TutorCard key={tutor._id} tutor={tutor} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/10 border border-dashed border-white/20 rounded-3xl mx-auto max-w-6xl">
                        <p className="text-white font-medium">No tutors found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorsClient;