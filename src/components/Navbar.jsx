'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Avatar } from '@heroui/react';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const [dynamicBgColor, setDynamicBgColor] = useState('#fdf2f8');
    const [isScrolled, setIsScrolled] = useState(false);

    // Active user identity session
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const activeUserId = user?.id || user?._id;

    useEffect(() => {
        setIsProfileDropdownOpen(false);
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleColorChange = (e) => setDynamicBgColor(e.detail);
        const handleScroll = () => setIsScrolled(window.scrollY > 40);

        window.addEventListener('bannerColorChange', handleColorChange);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('bannerColorChange', handleColorChange);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getNavbarBg = () => {
        if (pathname === '/') {
            return isScrolled ? '#ffffff' : dynamicBgColor;
        }
        return '#ffffff';
    };

    // Shared path matching check utility
    const isPathActive = (path) => {
        return pathname === path || (path !== '/' && pathname.startsWith(path));
    };

    // Desktop Link Sizing & Active Underline Design
    const getLinkClass = (path) => {
        const isActive = isPathActive(path);
        if (isActive) {
            return "text-[#AA4465] font-black border-b-4 border-[#AA4465] pb-2 transition-all duration-200";
        }
        return "text-gray-600 hover:text-[#AA4465] font-medium pb-2 transition-colors duration-200";
    };

    // NEW: Mobile Link Sizing & Left Thick Accent Border Design
    const getMobileLinkClass = (path) => {
        const isActive = isPathActive(path);
        if (isActive) {
            return "block text-lg font-black text-[#AA4465] bg-[#AA4465]/5 border-l-4 border-[#AA4465] pl-3 py-2 transition-all duration-200 rounded-r-lg";
        }
        return "block text-lg font-semibold text-gray-600 hover:text-[#AA4465] hover:bg-gray-50 pl-3 py-2 transition-all duration-200 rounded-lg";
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsProfileDropdownOpen(false);
        router.push('/');
        router.refresh();
    };

    return (
        <nav
            style={{ backgroundColor: getNavbarBg() }}
            className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled || pathname !== '/' ? 'shadow-md border-b border-gray-100' : 'shadow-none'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* LEFT SECTION */}
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

                            {/* UPDATED: Mobile Dropdown Menu List with increased fonts and active indicators */}
                            <ul
                                className={`fixed left-0 right-0 w-full bg-white shadow-xl border-b border-gray-200 py-4 px-6 z-40 space-y-1 transition-all duration-500 ease-in-out origin-top ${isMobileMenuOpen
                                    ? 'top-16 opacity-100 visible translate-y-0'
                                    : '-top-96 opacity-0 invisible -translate-y-4'
                                    }`}
                            >
                                <li>
                                    <Link href="/" className={getMobileLinkClass('/')}>Home</Link>
                                </li>
                                <li>
                                    <Link href="/tutors" className={getMobileLinkClass('/tutors')}>Tutors</Link>
                                </li>

                                {user && (
                                    <>
                                        <li className="pt-2 border-t border-gray-100 !mt-3">
                                            <Link href="/add-tutor" className={getMobileLinkClass('/add-tutor')}>Add Tutor</Link>
                                        </li>
                                        <li>
                                            <Link href={`/my-tutors/${activeUserId}`} className={getMobileLinkClass(`/my-tutors/${activeUserId}`)}>My Tutors</Link>
                                        </li>
                                        <li>
                                            <Link href={`/booked-sessions/${activeUserId}`} className={getMobileLinkClass(`/booked-sessions/${activeUserId}`)}>My Booked Sessions</Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Brand Logo */}
                        <Link href="/" className="text-4xl font-bold tracking-tight text-gray-800 transition-colors duration-300">
                            Medi<span className="text-[#AA4465]">Queue</span>
                        </Link>
                    </div>

                    {/* CENTER NAVIGATION LINKS SECTION */}
                    <div className="hidden lg:flex space-x-8 items-center pt-2">
                        <Link href="/" className={getLinkClass('/')}>Home</Link>
                        <Link href="/tutors" className={getLinkClass('/tutors')}>Tutors</Link>

                        {user && (
                            <>
                                <Link href="/add-tutor" className={getLinkClass('/add-tutor')}>Add Tutor</Link>
                                <Link href={`/my-tutors/${activeUserId}`} className={getLinkClass(`/my-tutors/${activeUserId}`)}>My Tutors</Link>
                                <Link href={`/booked-sessions/${activeUserId}`} className={getLinkClass(`/booked-sessions/${activeUserId}`)}>My Booked Sessions</Link>
                            </>
                        )}
                    </div>

                    {/* RIGHT AUTH CONTROL SECTION */}
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="relative border-l border-gray-200 pl-4 flex items-center">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex text-sm rounded-full focus:outline-none"
                                >
                                    <Avatar className="h-12 w-12 rounded-full border-2 border-[#AA4465]">
                                        <Avatar.Image
                                            referrerPolicy="no-referrer"
                                            alt={user?.name || "User"}
                                            src={user?.image}
                                            className="h-full w-full object-cover"
                                        />
                                        <Avatar.Fallback className="flex h-full w-full items-center justify-center rounded-full bg-[#AA4465]/10 font-bold text-[#AA4465] text-lg select-none">
                                            {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
                                        </Avatar.Fallback>
                                    </Avatar>
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 top-14 mt-2 w-48 rounded-xl shadow-xl py-1 bg-white ring-1 ring-black/5 z-50 overflow-hidden border border-gray-50">
                                        <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                                            <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                                        </div>

                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            My Profile
                                        </Link>

                                        <button
                                            onClick={handleSignOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/70 font-semibold transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-600 hover:text-gray-900 font-semibold transition-colors">
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-[#AA4465] hover:bg-[#8f3552] text-white px-5 py-2 rounded-xl transition-all duration-300 font-bold shadow-sm"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;