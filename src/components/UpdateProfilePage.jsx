"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";

const UpdateProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleUpdateFunc = async (data) => {
        const result = await authClient.updateUser({
            name: data.displayName,
            image: data.photoUrl,
        });

        if (result.error) {
            toast.error(result.error.message || "Failed to update profile");
            return;
        }

        toast.success("Profile updated successfully!");
        router.push("/profile"); 
        router.refresh();
    };

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <FiLoader className="animate-spin text-[#BB6984]" size={48} />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="text-center py-36 px-4">
                <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
                <p className="text-gray-600 mt-2">Log back in to modify this profile.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-12">
            <div className="w-full max-w-md bg-white shadow-sm border border-gray-100 rounded-3xl p-8">
                <h1 className="text-3xl font-black text-center text-gray-900">
                    Update Profile
                </h1>
                <div className="h-[1px] bg-gray-100 my-6"></div>

                <form className="space-y-4" onSubmit={handleSubmit(handleUpdateFunc)}>
                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                        <input
                            type="text"
                            defaultValue={session?.user?.name}
                            {...register("displayName", { required: "Name is required" })}
                            className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#BB6984]"
                            placeholder="Enter your name"
                        />
                        {errors.displayName && <p className="text-red-500 text-xs">{errors.displayName.message}</p>}
                    </div>

                    {/* Photo URL */}
                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700 ml-1">Photo URL</label>
                        <input
                            type="text"
                            defaultValue={session?.user?.image || ""}
                            {...register("photoUrl", { required: "Photo URL is required" })}
                            className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#BB6984]"
                            placeholder="Enter photo URL"
                        />
                        {errors.photoUrl && <p className="text-red-500 text-xs">{errors.photoUrl.message}</p>}
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => router.push("/profile")}
                            className="w-1/2 py-3 rounded-2xl font-bold text-gray-600 border border-gray-200 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 py-3 rounded-2xl font-bold bg-[#BB6984] text-white hover:bg-[#a3536d] shadow-sm"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfilePage;