"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    // States to control whether the menus are visible or hidden /toggle
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* LEFT SECTION: Hamburger (Mobile) & Logo */}
                    <div className="flex items-center">
                        {/* Mobile Hamburger Menu Button */}
                        <div className="relative mr-2 lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                type="button"
                                className="p-2 rounded-md text-gray-600 hover:text-[#aa4465] hover:bg-gray-100 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 12h8m-8 6h16" />
                                </svg>
                            </button>

                            
                            {/* Mobile Dropdown List (Sliding animation from top) */}
                            <ul
                                className={`fixed left-0 right-0 w-full bg-white shadow-lg border-b border-gray-100 py-4 px-6 z-40 transition-all duration-1000 ease-in-out origin-top ${isMobileMenuOpen
                                        ? 'top-16 opacity-100 visible translate-y-0'
                                        : '-top-96 opacity-0 invisible -translate-y-4'
                                    }`}
                            >
                                <li className="py-2"><Link href="/" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                                <li className="py-2"><Link href="/tutors" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>Tutors</Link></li>

                                {/* Protected mobile links */}
                                <li className="border-t border-gray-100 mt-2 pt-2 py-2"><Link href="/add-tutor" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>Add Tutor</Link></li>
                                <li className="py-2"><Link href="/my-tutors" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>My Tutors</Link></li>
                                <li className="py-2"><Link href="/booked-sessions" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>My Booked Sessions</Link></li>
                            </ul>
                        </div>

                        {/* Website Logo */}
                        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-800">
                            Tech<span className="text-[#aa4465]">Wave</span>
                        </Link>
                    </div>

                    {/* CENTER SECTION*/}
                    <div className="hidden lg:flex space-x-8 items-center">
                        <Link href="/" className="text-gray-600 hover:text-[#aa4465] font-medium transition-colors">Home</Link>
                        <Link href="/tutors" className="text-gray-600 hover:text-[#aa4465] font-medium transition-colors">Tutors</Link>
                        <Link href="/add-tutor" className="text-gray-600 hover:text-[#aa4465] font-medium transition-colors">Add Tutor</Link>
                        <Link href="/my-tutors" className="text-gray-600 hover:text-[#aa4465] font-medium transition-colors">My Tutors</Link>
                        <Link href="/booked-sessions" className="text-gray-600 hover:text-[#aa4465] font-medium transition-colors">My Booked Sessions</Link>
                    </div>

                    {/* RIGHT SECTION: Auth Buttons , login/out/register & Profile Layout */}
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-4">
                            <Link href="/login" className="text-gray-600 hover:text-[#aa4465] font-medium transition-colors">Login</Link>
                            <Link href="/register" className="bg-[#aa4465] text-white px-4 py-2 rounded-lg hover:bg-[#8f3552] transition-colors font-medium shadow-sm">Register</Link>
                        </div>

                        {/* Logged In Profile Image Menu */}
                        <div className="relative border-l border-gray-200 pl-4 flex items-center">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex text-sm rounded-full ring-2 ring-transparent hover:ring-[#aa4465] transition-all"
                            >
                                <img
                                    className="h-9 w-9 rounded-full object-cover border border-gray-200"
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                                    alt="User profile"
                                />
                            </button>

                            {/* Profile Dropdown Container (Controlled by state) */}
                            <div className={`absolute right-0 top-10 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 ${isProfileDropdownOpen ? 'block' : 'hidden'}`}>
                                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#aa4465]" onClick={() => setIsProfileDropdownOpen(false)}>
                                    My Profile
                                </Link>
                                <hr className="my-1 border-gray-100" />
                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium" onClick={() => setIsProfileDropdownOpen(false)}>
                                    Logout
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;