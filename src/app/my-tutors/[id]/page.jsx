import React from 'react';
import MyTutorsTable from '@/components/MyTutorsTable';
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MyTutorPage = async ({ params }) => {
    // await delay(2000);
    const { id } = await params;
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    let tutors = [];
    if (id) {
        try {
            const res = await fetch(`http://localhost:5000/my-tutors/${id}`, {
                cache: 'no-store',
                headers: {
                    authorization: `Bearer ${token}`,
                    // authorization: "logged in"
                },

            });
            if (res.ok) {
                tutors = await res.json();
            }
        } catch (error) {
            console.error("Failed to retrieve user specific tutor listings:", error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#CC8FA3]/10 via-gray-50 dark:bg-black py-10 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-[#AA4465] tracking-tight">
                        My Managed Tutors
                    </h1>
                    <p className="text-gray-500 dark:text-white text-sm mt-1 font-medium">
                        Review, modify details, or monitor capacity distributions across your registered tutor listings.
                    </p>
                </div>
                <MyTutorsTable initialTutors={tutors} />
            </div>
        </div>
    );
};

export default MyTutorPage;