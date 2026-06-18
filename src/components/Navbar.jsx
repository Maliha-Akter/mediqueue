'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname(); // Capture the current route location
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const [dynamicBgColor, setDynamicBgColor] = useState('#fdf2f8');
    const [isScrolled, setIsScrolled] = useState(false);


    const getRouteConfig = () => {
        switch (pathname) {
            case '/':
                return {
                    bg: isScrolled ? '#ffffff' : dynamicBgColor, 
                    text: 'text-gray-600',
                    activeText: 'text-[#aa4465]',
                    logoBrand: '#aa4465',
                    btnBg: 'bg-[#aa4465] hover:bg-[#8f3552]'
                };
            case '/tutors':
                return {
                    bg: isScrolled ? '#ffffff' : '#BB6984',
                    text: isScrolled ? 'text-gray-600' : 'text-white/90',
                    activeText: isScrolled ? 'text-[#BB6984] font-bold' : 'text-white font-black underline underline-offset-4',

                    logoBrand: isScrolled ? '#BB6984' : '#FFFFFF',

                    btnBg: isScrolled
                        ? 'bg-[#BB6984] text-white hover:bg-[#a3536d]'
                        : 'bg-white/20 text-white backdrop-blur-sm border border-white/40 hover:bg-white hover:text-[#BB6984]'
                };
            case '/add-tutor':
            case '/my-tutors':
            case '/booked-sessions':
                return {
                    bg: isScrolled ? '#ffffff' : '#f0f9ff', 
                    text: 'text-sky-800',
                    activeText: 'text-sky-600 font-bold',
                    logoBrand: '#0284c7',
                    btnBg: 'bg-sky-600 hover:bg-sky-700'
                };
            default:
                return {
                    bg: isScrolled ? '#ffffff' : '#ffffff', 
                    text: 'text-gray-600',
                    activeText: 'text-[#aa4465]',
                    logoBrand: '#aa4465',
                    btnBg: 'bg-[#aa4465] hover:bg-[#8f3552]'
                };
        }
    };

    const theme = getRouteConfig();

    useEffect(() => {
        // 1. 
        const handleColorChange = (e) => {
            setDynamicBgColor(e.detail);
        };

        // 2. 
        const handleScroll = () => {
            if (window.scrollY > 40) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('bannerColorChange', handleColorChange);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('bannerColorChange', handleColorChange);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getLinkClass = (path) => {
        const isExactActive = pathname === path;
        return `${isExactActive ? theme.activeText : `${theme.text} hover:opacity-80`} font-medium transition-colors duration-200`;
    };

    return (
        <nav
            style={{ backgroundColor: theme.bg }}
            className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'shadow-md border-b border-gray-100' : 'shadow-none'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* LEFT SECTION: Hamburger & Branding Logo */}
                    <div className="flex items-center">
                        <div className="relative mr-2 lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                type="button"
                                className="p-2 rounded-md text-gray-600 hover:bg-gray-100/50 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 12h8m-8 6h16" />
                                </svg>
                            </button>

                            {/* Mobile Dropdown List  */}
                            <ul
                                className={`fixed left-0 right-0 w-full bg-white shadow-lg border-b border-gray-100 py-4 px-6 z-40 transition-all duration-500 ease-in-out origin-top ${isMobileMenuOpen
                                        ? 'top-16 opacity-100 visible translate-y-0'
                                        : '-top-96 opacity-0 invisible -translate-y-4'
                                    }`}
                            >
                                <li className="py-2"><Link href="/" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>Home</Link></li>
                                <li className="py-2"><Link href="/tutors" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>Tutors</Link></li>
                                <li className="border-t border-gray-100 mt-2 pt-2 py-2"><Link href="/add-tutor" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>Add Tutor</Link></li>
                                <li className="py-2"><Link href="/my-tutors" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>My Tutors</Link></li>
                                <li className="py-2"><Link href="/booked-sessions" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]" onClick={() => setIsMobileMenuOpen(false)}>My Booked Sessions</Link></li>
                            </ul>
                        </div>

                        {/* Website Logo  */}
                        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-800 transition-colors duration-300">
                            Tech<span style={{ color: theme.logoBrand }} className="transition-colors duration-300">Wave</span>
                        </Link>
                    </div>

                    {/* CENTER SECTION */}
                    <div className="hidden lg:flex space-x-8 items-center">
                        <Link href="/" className={getLinkClass('/')}>Home</Link>
                        <Link href="/tutors" className={getLinkClass('/tutors')}>Tutors</Link>
                        <Link href="/add-tutor" className={getLinkClass('/add-tutor')}>Add Tutor</Link>
                        <Link href="/my-tutors" className={getLinkClass('/my-tutors')}>My Tutors</Link>
                        <Link href="/booked-sessions" className={getLinkClass('/booked-sessions')}>My Booked Sessions</Link>
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-4">
                            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Login</Link>
                            <Link
                                href="/register"
                                className={`${theme.btnBg} text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-sm`}
                            >
                                Register
                            </Link>
                        </div>

                        {/* Profile Dropdown Menu Block Layout  */}
                        {/* <div className="relative border-l border-gray-200 pl-4 flex items-center">
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

                            <div className={`absolute right-0 top-10 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50 ${isProfileDropdownOpen ? 'block' : 'hidden'}`}>
                                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileDropdownOpen(false)}>
                                    My Profile
                                </Link>
                                <hr className="my-1 border-gray-100" />
                                <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium" onClick={() => setIsProfileDropdownOpen(false)}>
                                    Logout
                                </button>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;