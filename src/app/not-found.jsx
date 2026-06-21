"use client"

import React from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-purple-50/30 px-4 overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl w-full text-center relative z-10 space-y-8 animate-fade-in">

                {/* LARGE STYLED 404 HEADER */}
                <div className="relative inline-block select-none">
                    <h1 className="text-[11rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-purple-900 via-purple-800 to-purple-950 leading-none drop-shadow-sm">
                        404
                    </h1>
                    <div className="absolute -bottom-2 right-4 bg-amber-500 text-white p-2.5 rounded-2xl shadow-lg border-4 border-white rotate-12 flex items-center justify-center">
                        <FaExclamationTriangle size={20} />
                    </div>
                </div>

                {/* INFORMATION CARD */}
                <Card className="border border-gray-200/60 shadow-xl bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 space-y-4 max-w-md mx-auto">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        Lost in Translation?
                    </h2>

                    <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                        The resource path structure you are looking for doesn't exist, has been decoupled, or has moved to a fresh operational layout.
                    </p>
                </Card>

                {/* ACTION BUTTON */}
                <div className="pt-2">
                    <Button
                        as={Link}
                        href="/"
                        startContent={<FaHome size={16} />}
                        className="bg-[#7A3048] hover:bg-[#63273a] text-white font-semibold text-md px-8 py-6 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 inline-flex items-center gap-2"
                    >
                        Return to Dashboard Home
                    </Button>
                </div>

            </div>
        </div>
    );
}