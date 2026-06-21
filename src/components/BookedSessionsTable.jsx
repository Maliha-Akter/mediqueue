"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";
import CancelSessionDialog from "./CancelSessionDialog";

export default function BookedSessionsTable({ initialBookings }) {
    const [bookings, setBookings] = useState(initialBookings || []);

    if (bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-6  border border-dashed border-gray-200 rounded-3xl text-center shadow-sm">
                <div className="p-4 bg-[#CC8FA3]/10 text-[#BB6984] rounded-full mb-4">
                    <FiCalendar size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">No Booked Sessions Found</h3>
                <p className="text-gray-500 max-w-sm mt-2 text-base dark:text-white">
                    You haven't scheduled any tutoring sessions yet. Start your journey today!
                </p>
                <Link
                    href="/tutors"
                    className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-[#BB6984] text-white font-semibold text-base rounded-xl hover:bg-[#a3536d] transition-colors"
                >
                    Browse Available Tutors
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    {/* Header: Visible only on MD and up */}
                    <thead className="hidden md:table-header-group bg-gray-50 dark:bg-gray-800 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            <th className="py-4 px-6">Assigned Tutor</th>
                            <th className="py-4 px-6">Student Info</th>
                            <th className="py-4 px-6">Booked Date</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 border border-b-[#a3536d]">
                        {bookings.map((booking) => (
                            <tr
                                key={booking._id}
                                className="block md:table-row p-4 md:p-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors border-b border-[#a3536d] lg:border-gray-100 dark:lg:border-gray-800 last:border-b-0"
                            >
                                {/* Tutor Info */}
                                <td className="py-2 px-0 md:py-4 md:px-6 block md:table-cell">
                                    <div className="flex flex-col">
                                        <h4 className="font-bold text-gray-900 dark:text-white">{booking.tutorName}</h4>
                                        <span className="text-[10px] font-mono text-gray-400">ID: {booking.tutorId}</span>
                                    </div>
                                </td>

                                {/* Student Info */}
                                <td className="py-2 px-0 md:py-4 md:px-6 block md:table-cell">
                                    <div className="text-gray-900 dark:text-gray-200 font-semibold">{booking.studentName}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{booking.studentEmail}</div>
                                </td>

                                {/* Date */}
                                <td className="py-2 px-0 md:py-4 md:px-6 block md:table-cell">
                                    <span className="md:hidden text-[10px] font-bold text-gray-400 uppercase mr-2">Date:</span>
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {new Date(booking.bookedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="py-2 px-0 md:py-4 md:px-6 block md:table-cell">
                                    <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${booking.bookingStatus === 'booked' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30" :
                                        booking.bookingStatus === 'cancelled' ? "bg-amber-50 text-amber-600 dark:bg-amber-900/30" : "bg-gray-100 text-gray-500"
                                        }`}>
                                        {booking.bookingStatus}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-0 md:py-4 md:px-6 block md:table-cell text-left md:text-right">
                                    {booking.bookingStatus === "booked" ? (
                                        <CancelSessionDialog
                                            booking={booking}
                                            onCancelSuccess={(cancelledId) =>
                                                setBookings(prev => prev.map(b =>
                                                    b._id === cancelledId ? { ...b, bookingStatus: "cancelled" } : b
                                                ))
                                            }
                                        />
                                    ) : (
                                        <span className="text-sm font-semibold text-gray-400 italic">No Actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}