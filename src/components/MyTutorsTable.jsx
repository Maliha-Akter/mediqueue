"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EditModal from "@/components/EditModal";
import DeleteDialog from "@/components/DeleteDialog";
import { FiBookOpen } from "react-icons/fi";

export default function MyTutorsTable({ initialTutors }) {
    const [tutors, setTutors] = useState(initialTutors || []);

    // Clean inline updater functions
    const handleUpdate = (id, updatedTutor) => {
        const updatedTutors = tutors.map((tutor) => {
            if (tutor._id === id) {
                return {
                    ...tutor,
                    ...updatedTutor,
                };
            }
            return tutor;
        });

        setTutors(updatedTutors);
    };

    const handleDelete = (id) => {
        const remainingTutors = tutors.filter(
            (tutor) => tutor._id !== id
        );

        setTutors(remainingTutors);
    };

    if (tutors.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-dashed border-gray-200 rounded-3xl text-center shadow-sm">
                <div className="p-4 bg-[#CC8FA3]/10 text-[#BB6984] rounded-full mb-4">
                    <FiBookOpen size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">No Tutor Registrations Found</h3>
                <p className="text-gray-500 max-w-sm mt-1 text-sm">
                    You haven&apos;t added any tutor profiles yet. Get started by creating your first listing!
                </p>
                <Link
                    href="/add-tutor"
                    className="mt-5 inline-flex items-center justify-center px-5 py-2.5 bg-[#BB6984] text-white font-semibold text-sm rounded-xl hover:bg-[#a3536d] transition-colors"
                >
                    Add a Tutor Profile
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
                            <th className="py-4 px-6">Tutor Info</th>
                            <th className="py-4 px-6">Subject</th>
                            <th className="py-4 px-6">Hourly Fee</th>
                            <th className="py-4 px-6">Available Slots</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm font-medium text-gray-700">
                        {tutors.map((tutor) => (
                            <tr key={tutor._id} className="hover:bg-gray-50/60 transition-colors">
                                <td className="py-4 px-6 flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-2xl bg-gray-50 overflow-hidden shrink-0 border border-gray-100">
                                        <Image
                                            src={tutor.photoUrl || "/assets/alt-user.png"}
                                            alt={tutor.tutorName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{tutor.tutorName}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{tutor.institution || "N/A"}</p>
                                    </div>
                                </td>

                                <td className="py-4 px-6 text-gray-600 capitalize">{tutor.subject}</td>

                                <td className="py-4 px-6 font-bold text-gray-900">
                                    ${tutor.hourlyFee}<span className="text-xs text-gray-400 font-normal">/hr</span>
                                </td>

                                <td className="py-4 px-6">
                                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${Number(tutor.totalSlots) > 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                                        {tutor.totalSlots ?? 0} Slots
                                    </span>
                                </td>

                                <td className="py-4 px-6 text-right">
                                    <div className="inline-flex items-center gap-2">
                                        <EditModal tutor={tutor} onUpdateSuccess={(fields) => handleUpdate(tutor._id, fields)} />
                                        <DeleteDialog tutor={tutor} onDeleteSuccess={() => handleDelete(tutor._id)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}