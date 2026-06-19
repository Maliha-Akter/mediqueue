'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { authClient } from '@/lib/auth-client';

const banners = [
    {
        id: 1,
        title: "Connect with Expert Tutors",
        description: "Discover experienced tutors across various subjects and accelerate your learning journey.",
        textColor: "text-[#0F2042]",
        hexColor: "#BAD3D8",
        imgSrc: "https://images.openai.com/static-rsc-4/ROTXnz1e34ij3j0hTOSVQYcfh1aeeIoiIoodlKHpJcXqzrRvxkIt6jlCEyq1-YAfWmPqNFJsLXkWgnbQm6gWvGmbQf94ke8wn85dCNBSGAY7GhEeG02YNK-bNkS0Ug8TzoiuR9D2hr_L1xp3v-m_i_8MdiMWq0S9wDJGXnpYvcRR2yo6X6KvPTpr5RYAtHji?purpose=fullsize"
    },
    {
        id: 2,
        title: "Easy Tutor Booking",
        description: "Book your preferred tutor in just a few clicks with our streamlined scheduling system.",
        textColor: "text-[#2E133C]",
        hexColor: "#AE92C3",
        imgSrc: "https://images.openai.com/static-rsc-4/cyg8DeOhjSOyFmTF34RpXKnzaL0REMTayF1uCh6SFWznn6uhmh5Y9lPyw1wVsN8gu3DusC1aMPopJu7WYHINra125bIOApyQrxsDYmM7sUANdLVNJT5J6qhBAWmaSpsiXk7D6aQcOwiqKZfg4PEC2RMYYwPSePTpYnr04TypANDJdXzLDsBT7Mc7os2F38kT?purpose=fullsize"
    },
    {
        id: 3,
        title: "Flexible Learning Sessions",
        description: "Choose convenient time slots and learn at your own pace from anywhere.",
        textColor: "text-[#0F172A]",
        hexColor: "#BEE1FF",
        imgSrc: "https://images.openai.com/static-rsc-4/17IzGC3tO2fYUG4D6rg7HmeURgUbOdXrqsQlyZvgffcY8g4_0K0MgzP8AcpTlwgTu_HR1EZ-QuSE4Ref8-99T2Wr8tZoPkOkIbxH889Yh6l-qkxBCu4CWAPOeCkZgHjx1geDBrzCrQ0Kx1O2ACh-JqL953SPZG3EcsYpnrydmx5cv8uxMTQwRTTWw2Sqhi0v?purpose=fullsize"
    },
    {
        id: 4,
        title: "Secure Digital Session Tokens",
        description: "Get instant booking confirmations and unique session tokens for every class.",
        textColor: "text-[#6D28D9]",
        hexColor: "#FEF7DB",
        imgSrc: "https://images.openai.com/static-rsc-4/Ci9auDJcJOyYc5jO9qXnEeiv6oUHiUVgc0GIqyGkehYo0XlOOSnJrCaU1wlM72DaVox-J8BieTwMQk824D4etj2D9mtXDo4g9SV5JgdneobnNELAeo9L2vjpSZAAqUiq72NjJz94AyP5JF5UE805fojvHTMeFdEl7dr6_axRx_SX2A2G4Y2VDTkMRJejCqsx?purpose=fullsize"
    },
    {
        id: 5,
        title: "No More Scheduling Conflicts",
        description: "Our smart booking system prevents overlapping sessions and ensures smooth coordination.",
        textColor: "text-[#B45309]",
        hexColor: "#C5D5A8",
        imgSrc: "https://images.openai.com/static-rsc-4/_GH_5zuonyD4e-3XAGrcLgQIgvsuNVGZSDSb_SsxkOzoKxRoyWr_2LvT8FO2Zd_YkwmzyBbY7SbepdNNh6jPjaRDqJXVlJWgAVaA7w55LcyRL1t8m29Sruwgdvz5ck74IyLq0hf2yUSB9HggsmVuaO7MXKDsxi_LfJ75QsRn28QHO8YeES9ScTkwcSQVafJC?purpose=fullsize"
    },
    {
        id: 6,
        title: "Your Success Starts Here",
        description: "Join MediQueue today and make learning more organized, accessible, and effective.",
        textColor: "text-[#aa4465]",
        hexColor: "#A6E0E2",
        imgSrc: "https://images.openai.com/static-rsc-4/gwh8PBiyUZtVi9AGTUUokRwWSEe1tsifbDyZirnS7KfPEy_8DAjLhEtqfCqDBS0p5FuEqtXebylEEbEXfhYBBJSAXO0Fe_-qGgk_tYMQkPFLR7j8YT6iYnI2M55YUNdwqFPrRNzdv4lsVBBrz8P1IoPmGxlZVC2sLCKWRxfhrUmIA8vHS4uhiVFDdKx35Ik_?purpose=fullsize"
    }
];

const Banner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(0);
    const [triggerRipple, setTriggerRipple] = useState(false);

    const { data: session } = authClient.useSession();
    const user = session?.user;
    const activeUserId = user?.id || user?._id;

    useEffect(() => {
        const activeColor = banners[activeIndex].hexColor;
        const event = new CustomEvent('bannerColorChange', { detail: activeColor });
        window.dispatchEvent(event);
    }, [activeIndex]);

    useEffect(() => {
        setTriggerRipple(false);

        const startAnimation = setTimeout(() => {
            setTriggerRipple(true);
        }, 30);

        const syncLayers = setTimeout(() => {
            setPrevIndex(activeIndex);
        }, 1200);

        return () => {
            clearTimeout(startAnimation);
            clearTimeout(syncLayers);
        };
    }, [activeIndex]);

    return (
        <div className="relative w-full mx-auto min-h-[80vh] md:min-h-[600px] py-12 md:py-20 flex items-center overflow-hidden transition-all duration-300">

            {/* HIDDEN SVG LIQUID DISTORTION FILTER */}
            <svg className="absolute w-0 h-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <defs>
                    <filter id="liquid-drop" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise">
                            <animate
                                attributeName="baseFrequency"
                                values="0.02 0.05; 0.04 0.09; 0.02 0.05"
                                dur="5s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                </defs>
            </svg>

            {/* LAYER 1: Base Canvas */}
            <div
                className="absolute inset-0 transition-colors duration-300"
                style={{ backgroundColor: banners[prevIndex].hexColor, zIndex: 0 }}
            />

            {/* LAYER 2: Fluid Ripple Layer */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundColor: banners[activeIndex].hexColor,
                    transition: 'clip-path 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter: 'url(#liquid-drop)',
                    zIndex: 1,
                    clipPath: triggerRipple ? 'circle(175% at 100% 100%)' : 'circle(0% at 100% 100%)',
                }}
            />

            {/* GRID CONTROL: 
                - Single column `grid-cols-1` on mobile/tablet (stacks vertically).
                - Switches to two equal columns `md:grid-cols-2` starting exactly at md (768px).
            */}
            <div className="relative container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center z-10">

                {/* LEFT SIDE: Dynamic Text Column */}
                {/* order-2 puts text below image on mobile, md:order-1 puts it back on left for desktop */}
                <div className="w-full flex flex-col justify-center text-center md:text-left order-2 md:order-1">
                    <div className="transition-all duration-500">
                        <span className={`text-xl sm:text-sm uppercase font-bold tracking-widest transition-colors duration-500 text-[#8f3552]`}>
                            MediQueue Platform
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-800 mt-2 sm:mt-3 leading-tight tracking-tight">
                            {banners[activeIndex].title}
                        </h1>
                        <p className="pt-3 pb-5 sm:py-4 text-gray-600 text-base sm:text-lg leading-relaxed whitespace-normal max-w-xl mx-auto md:mx-0">
                            {banners[activeIndex].description}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center md:justify-start gap-4 mt-2 sm:mt-4 w-full">
                        <Link
                            href={activeUserId ? "/tutors" : "/login"}
                            className="w-full sm:w-auto md:w-full lg:w-auto text-center px-6 py-3 bg-[#aa4465] text-white rounded-xl font-semibold hover:bg-[#8f3552] transition-all shadow-md hover:shadow-lg transform active:scale-95"
                        >
                            Book a Tutor
                        </Link>

                        <button
                            type="button"
                            className="w-full sm:w-auto md:w-full lg:w-auto px-6 py-3 border border-[#aa4465] bg-white/40 backdrop-blur-sm hover:bg-[#aa4465] hover:text-white text-gray-700 flex items-center justify-center gap-3 rounded-xl font-semibold transition-all shadow-sm"
                        >
                            <FcGoogle size={22} />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE: Image Slider Column */}
                {/* RIGHT SIDE: Polished Image Slider Column */}
                <div className="relative flex flex-col justify-center items-center w-full order-1 md:order-2 mb-8 md:mb-0">
                    {/* 1. Fixed aspect-square for uniformity.
        2. Added p-4 and bg-white/20 to create a "frame" effect.
        3. rounded-3xl ensures the frame looks modern.
    */}
                    <div className="w-full max-w-sm lg:max-w-md aspect-square bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-3xl border border-white/20 shadow-xl relative overflow-hidden">
                        <Swiper
                            modules={[Autoplay, Navigation]}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            speed={1000}
                            loop={true}
                            className="h-full w-full"
                            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                            navigation={{
                                prevEl: '.swiper-custom-prev',
                                nextEl: '.swiper-custom-next',
                            }}
                        >
                            {banners.map((item) => (
                                <SwiperSlide key={item.id}>
                                    {({ isActive }) => (
                                        <div
                                            className={`
                                w-full h-full transition-all duration-700 ease-in-out flex items-center justify-center
                                ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                            `}
                                        >
                                            {/* object-contain: Forces the image to fit entirely.
                                p-2: Ensures image never touches the edge of our card frame.
                            */}
                                            <img
                                                src={item.imgSrc}
                                                alt={item.title}
                                                className="w-full h-full object-contain p-2 drop-shadow-2xl"
                                            />
                                        </div>
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Refined Navigation Buttons */}
                    <div className="flex items-center gap-4 mt-8">
                        <button
                            className="swiper-custom-prev w-12 h-12 rounded-full border border-[#aa4465]/20 bg-white text-[#aa4465] hover:bg-[#aa4465] hover:text-white transition-all shadow-md flex items-center justify-center active:scale-95"
                            aria-label="Previous Slide"
                        >
                            &#10094;
                        </button>
                        <button
                            className="swiper-custom-next w-12 h-12 rounded-full border border-[#aa4465]/20 bg-white text-[#aa4465] hover:bg-[#aa4465] hover:text-white transition-all shadow-md flex items-center justify-center active:scale-95"
                            aria-label="Next Slide"
                        >
                            &#10095;
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;