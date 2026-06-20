"use client";

import React from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiUser, FiMail, FiCalendar, FiLoader, FiHash, FiClock, FiEdit3 } from 'react-icons/fi';
import { ProfileEditModal } from '@/components/ProfileEditModal';

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {
        // Only redirect the part if the check is finished and there is no session
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    // Showing a loading spinner while the session is being fetched (for profile + logout)
    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <FiLoader className="animate-spin text-[#BB6984]" size={48} />
            </div>
        );
    }

    if (!session) return null;

    const { user } = session;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Header Banner */}
                    <div className="h-32 bg-gradient-to-r from-[#CC8FA3] to-[#BB6984]" />

                    <div className="px-8 pb-8">
                        {/* Profile Picture */}
                        <div className="relative -mt-16 mb-6">
                            <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-sm">
                                {user.image ? ( // Ensure this check is robust
                                    <img src={user.image} alt="Profile" className="w-full h-full rounded-2xl object-cover" />
                                ) : (
                                    <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                                        <FiUser size={48} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-black text-gray-900">{user.name || "User Profile"}</h1>
                                <p className="text-gray-500 font-medium">{user.email}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* User ID */}
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                                    <FiHash className="text-[#BB6984]" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">User ID</p>
                                        <p className="text-sm font-semibold text-gray-700 truncate max-w-[180px]">{user.id}</p>
                                    </div>
                                </div>
                                {/* Member Since */}
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3">
                                    <FiCalendar className="text-[#BB6984]" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Member Since</p>
                                        <p className="text-sm font-semibold text-gray-700">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                {/* Last Updated */}
                                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3 col-span-1 sm:col-span-2">
                                    <FiClock className="text-[#BB6984]" />
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400">Last Profile Update</p>
                                        <p className="text-sm font-semibold text-gray-700">
                                            {new Date(user.updatedAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="pt-4">
                                <ProfileEditModal user={user} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;