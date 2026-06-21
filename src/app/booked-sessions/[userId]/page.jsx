import React from 'react';
import BookedSessionsTable from '@/components/BookedSessionsTable';
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";

export const metadata = {
  title: "My Booked Sessions",
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const BookedSessionsPage = async (props) => {
    const params = await props.params;
    const { userId } = params;
    await delay(1000);
    let bookings = [];
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    if (userId) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${userId}`, {
                cache: 'no-store',
                headers: {
                    authorization: `Bearer ${token}`,
                    // authorization: "logged in"
                },
            });
            if (res.ok) {
                bookings = await res.json();
            }
        } catch (error) {
            console.error("Failed to retrieve user specific booking collections:", error);
        }
    }

    return (
        // 'bg-white' for light, 'dark:bg-gray-950' for dark
        <div className="min-h-screen bg-white dark:bg-gray-950 py-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    {/* Add dark:text-white */}
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                        My Booked Sessions
                    </h1>
                    {/* Add dark:text-gray-400 */}
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
                        Track, monitor status verification, or cancel appointments across your scheduled tutor sessions.
                    </p>
                </div>

                <BookedSessionsTable initialBookings={bookings} />
            </div>
        </div>
    );
};

export default BookedSessionsPage;