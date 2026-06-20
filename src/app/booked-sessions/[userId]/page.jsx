import React from 'react';
import BookedSessionsTable from '@/components/BookedSessionsTable';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BookedSessionsPage = async (props) => {
    const params = await props.params;
    const { userId } = params;
await delay(1000);
    let bookings = [];
    if (userId) {
        try {
            const res = await fetch(`http://localhost:5000/booking/${userId}`, {
                cache: 'no-store'
            });
            if (res.ok) {
                bookings = await res.json();
            }
        } catch (error) {
            console.error("Failed to retrieve user specific booking collections:", error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#CC8FA3]/10 via-gray-50 to-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Booked Sessions</h1>
                    <p className="text-gray-500 text-sm mt-1 font-medium">
                        Track, monitor status verification, or cancel appointments across your scheduled tutor sessions.
                    </p>
                </div>
                
                <BookedSessionsTable initialBookings={bookings} />
            </div>
        </div>
    );
};

export default BookedSessionsPage;