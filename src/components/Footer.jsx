'use client';

import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
// Use the modern X icon for Twitter rebrand compliance
import { FaXTwitter } from 'react-icons/fa6'; 

const Footer = () => {
    return (
        /* Reversed styling: Clean white background with structural border line */
        <footer className="relative w-full bg-white text-gray-600 border-t border-gray-100 transition-all duration-300 z-30">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                
                {/* COLUMN 1: BRAND PLATFORM */}
                <div className="flex flex-col gap-3">
                    {/* FIXED LOGO: Exact matching typographic weight and branding syntax as the Navbar */}
                    <Link href="/" className="text-4xl font-bold tracking-tight text-gray-800 transition-colors duration-300">
                        Medi<span style={{ color: '#aa4465' }}>Queue</span>
                    </Link>
                    <p className="text-sm text-gray-500 leading-relaxed mt-1">
                        Connecting passionate learners with top-tier expert tutors worldwide. Revolutionizing digital academic management, scheduling, and learning infrastructure.
                    </p>
                </div>

                {/* COLUMN 2: TUTOR / LEARNING SERVICES */}
                <div>
                    <h3 className="text-sm uppercase font-bold tracking-wider text-gray-900 mb-4 opacity-90">
                        Learning Services
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li>
                            <Link href="/tutors/find" className="hover:text-[#aa4465] transition-colors duration-200">Find Expert Tutors</Link>
                        </li>
                        <li>
                            <Link href="/sessions/book" className="hover:text-[#aa4465] transition-colors duration-200">1-on-1 Private Booking</Link>
                        </li>
                        <li>
                            <Link href="/courses" className="hover:text-[#aa4465] transition-colors duration-200">Flexible Video Courses</Link>
                        </li>
                        <li>
                            <Link href="/tokens" className="hover:text-[#aa4465] transition-colors duration-200">Digital Session Tokens</Link>
                        </li>
                        <li>
                            <Link href="/become-tutor" className="hover:text-[#aa4465] transition-colors duration-200">Become a Paid Mentor</Link>
                        </li>
                    </ul>
                </div>

                {/* COLUMN 3: CONTACT INFORMATION */}
                <div>
                    <h3 className="text-sm uppercase font-bold tracking-wider text-gray-900 mb-4 opacity-90">
                        Contact Info
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li className="flex items-center gap-3">
                            <FaEnvelope className="text-gray-400 shrink-0" size={16} />
                            <a href="mailto:support@mediqueue.com" className="hover:underline truncate hover:text-[#aa4465]">support@mediqueue.com</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaPhoneAlt className="text-gray-400 shrink-0" size={14} />
                            <a href="tel:+1234567890" className="hover:underline hover:text-[#aa4465]">+1 (234) 567-890</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-gray-400 shrink-0" size={16} />
                            <span>123 Academic Square, NY 10001</span>
                        </li>
                    </ul>
                </div>

                {/* COLUMN 4: SOCIAL CONNECTIONS */}
                <div>
                    <h3 className="text-sm uppercase font-bold tracking-wider text-gray-900 mb-4 opacity-90">
                        Follow Our Journey
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                        Stay linked for upcoming educational webinars, platform updates, and learning strategy features.
                    </p>
                    <div className="flex gap-3">
                        {/* Soft gray brand buttons with dark text that flip cleanly to brand-pink on hover states */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-[#aa4465] text-gray-600 hover:text-white border border-gray-100 transition-all transform active:scale-90 shadow-sm">
                            <FaFacebookF size={15} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-[#aa4465] text-gray-600 hover:text-white border border-gray-100 transition-all transform active:scale-90 shadow-sm">
                            <FaXTwitter size={15} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-[#aa4465] text-gray-600 hover:text-white border border-gray-100 transition-all transform active:scale-90 shadow-sm">
                            <FaLinkedinIn size={15} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-[#aa4465] text-gray-600 hover:text-white border border-gray-100 transition-all transform active:scale-90 shadow-sm">
                            <FaInstagram size={15} />
                        </a>
                    </div>
                </div>

            </div>

            {/* LOWER SECTION: COPYRIGHT METADATA */}
            <div className="border-t border-gray-100 bg-gray-50/50 py-4 px-6 text-center text-xs text-gray-400 font-medium">
                &copy; {new Date().getFullYear()} MediQueue Platform. All rights reserved. Built with precision for premium education.
            </div>
        </footer>
    );
};

export default Footer;