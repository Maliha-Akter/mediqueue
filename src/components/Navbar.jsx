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

    // active user identity session
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const activeUserId = user?.id || user?._id;

    useEffect(() => {
        setIsProfileDropdownOpen(false);
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const getRouteConfig = () => {
        if (pathname === '/') {
            return {
                bg: isScrolled ? '#ffffff' : dynamicBgColor,
                text: isScrolled ? 'text-gray-600' : 'text-[#8f3552]',
                activeText: isScrolled ? 'text-[#BB6984] font-bold underline underline-offset-4' : 'text-[#BB6984] font-black border-b-3 border-gray-600',
                logoBrand: '#aa4465',
                btnBg: 'bg-[#aa4465] hover:bg-[#8f3552]'
            };
        }
        if (pathname === '/tutors') {
            return {
                bg: isScrolled ? '#ffffff' : '#BB6984',
                text: isScrolled ? 'text-gray-600' : 'text-white/90',
                activeText: isScrolled ? 'text-[#BB6984] font-bold border-b-3 border-[#BB6984] ' : 'text-white font-black underline underline-offset-4 ',
                logoBrand: isScrolled ? '#BB6984' : '#FFFFFF',
                btnBg: isScrolled
                    ? 'bg-[#BB6984] text-white hover:bg-[#a3536d]'
                    : 'bg-white/20 text-white backdrop-blur-sm border border-white/40 hover:bg-white hover:text-[#BB6984]'
            };
        }
        if (pathname === '/add-tutor' || pathname.startsWith('/my-tutors') || pathname === '/booked-sessions') {
            return {
                bg: isScrolled ? '#ffffff' : '#f0f9ff',
                text: 'text-sky-800',
                activeText: 'text-sky-600 font-bold',
                logoBrand: '#0284c7',
                btnBg: 'bg-sky-600 hover:bg-sky-700'
            };
        }
        return {
            bg: isScrolled ? '#ffffff' : '#ffffff',
            text: 'text-gray-600',
            activeText: 'text-[#aa4465]',
            logoBrand: '#aa4465',
            btnBg: 'bg-[#aa4465] hover:bg-[#8f3552]'
        };
    };

    const theme = getRouteConfig();

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

    const getLinkClass = (path) => {
        const isExactActive = pathname === path || (path.startsWith('/my-tutors') && pathname.startsWith('/my-tutors'));
        return `${isExactActive ? theme.activeText : `${theme.text} hover:opacity-80`} font-medium transition-colors duration-200`;
    };

    const handleSignOut = async () => {
        await authClient.signOut();
        setIsProfileDropdownOpen(false);
        router.push('/');
        router.refresh();
    };

    return (
        <nav
            style={{ backgroundColor: theme.bg }}
            className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'shadow-md border-b border-gray-100' : 'shadow-none'}`}
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

                            {/* Mobile Dropdown List */}
                            <ul
                                className={`fixed left-0 right-0 w-full bg-white shadow-lg border-b border-gray-100 py-4 px-6 z-40 transition-all duration-500 ease-in-out origin-top ${isMobileMenuOpen
                                    ? 'top-16 opacity-100 visible translate-y-0'
                                    : '-top-96 opacity-0 invisible -translate-y-4'
                                    }`}
                            >
                                <li className="py-2"><Link href="/" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]">Home</Link></li>
                                <li className="py-2"><Link href="/tutors" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]">Tutors</Link></li>

                                {/* Conditional Mobile Auth Guards */}
                                {user && (
                                    <>
                                        <li className="border-t border-gray-100 mt-2 pt-2 py-2"><Link href="/add-tutor" className="block text-base font-medium text-gray-700 hover:text-[#aa4465]">Add Tutor</Link></li>
                                        <li className="py-2"><Link href={`/my-tutors/${activeUserId}`} className="block text-base font-medium text-gray-700 hover:text-[#aa4465]">My Tutors</Link></li>
                                        <li className="py-2"><Link href={`/booked-sessions/${activeUserId}`}className="block text-base font-medium text-gray-700 hover:text-[#aa4465]">My Booked Sessions</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Website Logo */}
                        <Link href="/" className="text-2xl font-bold tracking-tight text-gray-800 transition-colors duration-300">
                            Tech<span style={{ color: theme.logoBrand }} className="transition-colors duration-300">Wave</span>
                        </Link>
                    </div>

                    {/* CENTER SECTION */}
                    <div className="hidden lg:flex space-x-8 items-center">
                        <Link href="/" className={getLinkClass('/')}>Home</Link>
                        <Link href="/tutors" className={getLinkClass('/tutors')}>Tutors</Link>

                        {/* Conditional Desktop Links Block */}
                        {user && (
                            <>
                                <Link href="/add-tutor" className={getLinkClass('/add-tutor')}>Add Tutor</Link>
                                <Link href={`/my-tutors/${activeUserId}`} className={getLinkClass(`/my-tutors/${activeUserId}`)}>My Tutors</Link>
                                <Link href={`/booked-sessions/${activeUserId}`} className={getLinkClass('/booked-sessions')}>My Booked Sessions</Link>
                            </>
                        )}
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <div className="relative border-l border-gray-200 pl-4 flex items-center">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex text-sm rounded-full ring-2 ring-transparent hover:ring-[#ffffff] transition-all focus:outline-none"
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
                                    <div className="absolute right-0 top-10 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black/5 z-50">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-medium text-gray-800 truncate">{user?.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                        </div>

                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            My Profile
                                        </Link>

                                        <button
                                            onClick={handleSignOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className={`${theme.btnBg} text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium shadow-sm`}
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