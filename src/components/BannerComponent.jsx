'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';

const banners = [
    {
        id: 1,
        title: "Connect with Expert Tutors",
        description: "Gain personalized guidance from vetted subject-matter experts dedicated to your academic growth.",
        textColor: "text-[#0F2042]",
        hexColor: "#BAD3D8",
        imgSrc: "https://i.ibb.co.com/YBR9qLjV/h1.jpg"
    },
    {
        id: 2,
        title: "Effortless Tutor Booking",
        description: "Skip the back-and-forth emails. Secure your perfect tutor instantly with our seamless booking flow.",
        textColor: "text-[#2E133C]",
        hexColor: "#AE92C3",
        imgSrc: "https://i.ibb.co.com/5WrzwKfB/h2.jpg"
    },
    {
        id: 3,
        title: "Learning on Your Terms",
        description: "Master new skills at your own pace with flexible sessions that fit perfectly into your busy life.",
        textColor: "text-[#0F172A]",
        hexColor: "#BEE1FF",
        imgSrc: "https://i.ibb.co.com/ZCx8PTV/h3.jpg"
    },
    {
        id: 4,
        title: "Secure, Verified Sessions",
        description: "Rest easy with encrypted booking confirmations and unique access tokens for every private session.",
        textColor: "text-[#6D28D9]",
        hexColor: "#FEF7DB",
        imgSrc: "https://i.ibb.co.com/qYgmz3FP/h4.jpg"
    },
    {
        id: 5,
        title: "Conflict-Free Scheduling",
        description: "Our intelligent calendar syncs in real-time, eliminating double-bookings and scheduling stress.",
        textColor: "text-[#B45309]",
        hexColor: "#C5D5A8",
        imgSrc: "https://i.ibb.co.com/FqCGt5p1/h5.jpg"
    },
    {
        id: 6,
        title: "Unlock Your Potential",
        description: "Join the MediQueue community today and transform the way you learn, grow, and achieve your goals.",
        textColor: "text-[#aa4465]",
        hexColor: "#A6E0E2",
        imgSrc: "https://i.ibb.co.com/mVPSbzms/h6.jpg"
    }
];

const BannerComponent = () => {
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
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const handleBookClick = () => {
        // if (session) {
        //     router.push("/tutors");
        // } else {
        //     router.push("/login?callbackUrl=/tutors");
        // }
        router.push("/tutors");
    };

    const handleGoogleSignin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: callbackUrl,
            });
        } catch (err) {
            console.error("Social login processing error:", err);
            toast.error("Failed to authenticate with Google.");
        }
    };
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
                                dur="2s"
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

            {/* LAYER 2: Fluid Ripple Layer svg part*/}
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


            <div className="relative container mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center z-10">

                {/* LEFT SIDE: Dynamic Text Column */}
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
                        <button
                            onClick={handleBookClick}
                            className="w-full sm:w-auto md:w-full lg:w-auto text-center px-6 py-3 bg-[#aa4465] text-white rounded-xl font-semibold hover:bg-transparent hover:border hover:border-[#8f3552] hover:text-[#8f3552] transition-all shadow-md hover:shadow-lg transform active:scale-95 cursor-pointer"
                        >
                            Book a Tutor
                        </button>

                        <button
                            onClick={handleGoogleSignin}
                            type="button"
                            className="w-full sm:w-auto md:w-full lg:w-auto px-6 py-3 border border-[#aa4465] bg-white/40 backdrop-blur-sm hover:bg-[#aa4465] hover:text-white text-gray-700 flex items-center justify-center gap-3 rounded-xl font-semibold transition-all shadow-sm cursor-pointer"
                        >
                            <FcGoogle size={22} />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </div>

                {/* RIGHT SIDE: Image Slider Column */}
                <div className="relative flex flex-col justify-center items-center w-full order-1 md:order-2 mb-8 md:mb-0">
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

export default BannerComponent;