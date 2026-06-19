"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";
import CancelSessionDialog from "./CancelSessionDialog";

export default function BookedSessionsTable({ initialBookings }) {
    const [bookings, setBookings] = useState(initialBookings || []);

    const handleCancel = async (bookingId) => {
        try {
            const res = await fetch(`http://localhost:5000/booking/${bookingId}`, {
                method: "PATCH",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ bookingStatus: "cancelled" })
            });

            if (res.ok) {
                toast.success("Session cancelled successfully");
                setBookings((prev) =>
                    prev.map((b) =>
                        b._id === bookingId ? { ...b, bookingStatus: "cancelled" } : b
                    )
                );
            } else {
                toast.error("Failed to cancel session");
            }
        } catch (error) {
            console.error("Cancellation breakdown error:", error);
            toast.error("Connection error while cancelling.");
        }
    };

    if (bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-dashed border-gray-200 rounded-3xl text-center shadow-sm">
                <div className="p-4 bg-[#CC8FA3]/10 text-[#BB6984] rounded-full mb-4">
                    <FiCalendar size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">No Booked Sessions Found</h3>
                <p className="text-gray-500 max-w-sm mt-1 text-sm">
                    You haven&apos;t scheduled or booked any tutoring sessions yet. Find a tutor to start learning!
                </p>
                <Link
                    href="/find-tutors"
                    className="mt-5 inline-flex items-center justify-center px-5 py-2.5 bg-[#BB6984] text-white font-semibold text-sm rounded-xl hover:bg-[#a3536d] transition-colors"
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
                    <thead>
                        <tr className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                            <th className="py-4 px-6">Assigned Tutor</th>
                            <th className="py-4 px-6">Student Info</th>
                            <th className="py-4 px-6">Booked Date</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50/60 transition-colors">
                                <td className="py-4 px-6">
                                    <h4 className="font-bold text-gray-900">{booking.tutorName}</h4>
                                    <p className="text-xs text-gray-400 font-medium">ID: {booking.tutorId}</p>
                                </td>

                                <td className="py-4 px-6">
                                    <div className="text-gray-900 font-bold">{booking.studentName}</div>
                                    <div className="text-xs text-gray-400 font-normal">{booking.studentEmail}</div>
                                </td>

                                <td className="py-4 px-6 text-gray-500 font-normal">
                                    {new Date(booking.bookedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </td>

                                <td className="py-4 px-6">
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${booking.bookingStatus === 'booked'
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-gray-100 text-gray-400"
                                        }`}>
                                        {booking.bookingStatus}
                                    </span>
                                </td>

                                <td className="py-4 px-6 text-right">
                                    {booking.bookingStatus === "booked" ? (
                                        <CancelSessionDialog
                                            booking={booking}
                                            onCancelSuccess={(cancelledId) => {
                                                setBookings(prev => prev.filter(b => b._id !== cancelledId));
                                            }}
                                        />
                                    ) : (
                                        <span className="text-xs font-semibold text-gray-400 italic pr-2">
                                            No Actions
                                        </span>
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