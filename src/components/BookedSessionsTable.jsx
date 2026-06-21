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
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="hidden md:table-header-group bg-gray-50 text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">
                        <tr>
                            <th className="py-5 px-6">Assigned Tutor</th>
                            <th className="py-5 px-6">Student Info</th>
                            <th className="py-5 px-6">Booked Date</th>
                            <th className="py-5 px-6">Status</th>
                            <th className="py-5 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-base font-medium text-gray-700">
                        {bookings.map((booking) => (
                            <tr
                                key={booking._id}
                                className="flex flex-col md:table-row hover:bg-gray-50/60 transition-colors p-5 md:p-0 border-b border-gray-600 md:border-b-0 last:border-b-0"
                            >
                                <td className="py-3 px-0 md:py-6 md:px-6">
                                    <div className="flex justify-between md:block">
                                        <h4 className="font-bold text-lg text-gray-900">{booking.tutorName}</h4>
                                        <span className="md:hidden text-xs bg-gray-100 px-2.5 py-0.5 rounded text-gray-500">ID: {booking.tutorId}</span>
                                    </div>
                                    <p className="hidden md:block text-sm text-gray-400 font-medium">ID: {booking.tutorId}</p>
                                </td>

                                <td className="py-3 px-0 md:py-6 md:px-6">
                                    <div className="text-gray-900 font-semibold">{booking.studentName}</div>
                                    <div className="text-sm text-gray-500 font-normal">{booking.studentEmail}</div>
                                </td>

                                <td className="py-3 px-0 md:py-6 md:px-6 text-gray-600">
                                    <span className="md:hidden text-xs font-bold text-gray-400 uppercase mr-2">Date:</span>
                                    {new Date(booking.bookedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </td>

                                <td className="py-3 px-0 md:py-6 md:px-6">
                                    <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide ${
                                        booking.bookingStatus === 'booked' ? "bg-emerald-50 text-emerald-600" : 
                                        booking.bookingStatus === 'cancelled' ? "bg-amber-50 text-amber-600" : "bg-gray-100 text-gray-500"
                                    }`}>
                                        {booking.bookingStatus}
                                    </span>
                                </td>

                                <td className="py-4 px-0 md:py-6 md:px-6 text-left md:text-right border-t md:border-t-0 mt-3 pt-4 md:mt-0 md:pt-6">
                                    {booking.bookingStatus === "booked" ? (
                                        <CancelSessionDialog
                                            booking={booking}
                                            onCancelSuccess={(cancelledId) => 
                                                setBookings(prev => 
                                                    prev.map(b => 
                                                        b._id === cancelledId ? { ...b, bookingStatus: "cancelled" } : b
                                                    )
                                                )
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