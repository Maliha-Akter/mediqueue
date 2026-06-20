'use client';
import React, { useState, useEffect } from 'react';
import { FaBookOpen, FaClock, FaDollarSign, FaShieldAlt } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    { title: 'Verified Tutors', icon: <FaBookOpen className="w-8 h-8" />, desc: 'All tutors are carefully reviewed.' },
    { title: 'Flexible Sessions', icon: <FaClock className="w-8 h-8" />, desc: 'Book according to your schedule.' },
    { title: 'Affordable Rates', icon: <FaDollarSign className="w-8 h-8" />, desc: 'Match your specific budget.' },
    { title: 'Secure Platform', icon: <FaShieldAlt className="w-8 h-8" />, desc: 'Safe and reliable booking.' },
  ];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) return null;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden dark:bg-gray-950">
      <div className="container mx-auto px-5 md:px-6">
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white text-center mb-12 md:mb-20">
          Why Choose MediQueue?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex justify-items-center lg:justify-center items-center gap-6 lg:gap-0 lg:min-h-[400px] lg:[perspective:1000px]">
          {features.map((item, index) => (
            <div
              key={index}
              className="
                group relative 
                w-full max-w-[240px] 
                h-60 lg:h-72
                bg-white  rounded-3xl shadow-lg border-[1.5px] border-[#AA4465]/20 
                p-5 lg:p-6 flex flex-col items-center text-center transition-all duration-500 ease-out
                
                /* Animations only on large screens */
                md:animate-[floating_4s_ease-in-out_infinite]
                md:hover:!translate-y-[-50px] lg:hover:!rotate-0 
                
                /* Standard hover for all */
                hover:shadow-2xl hover:-translate-y-2 cursor-pointer
              "
              style={{
                // Rotation and Negative Margin ONLY on large screens
                transform: typeof window !== 'undefined' && window.innerWidth >= 1024
                  ? `rotate(${(index - (features.length - 1) / 2) * 8}deg)`
                  : 'none',
                marginLeft: typeof window !== 'undefined' && window.innerWidth >= 1024
                  ? '-20px'
                  : '0px',
                animationDelay: `${index * 1}s`,
                animationDuration: `${4 + index}s`
              }}
            >
              <div className="text-[#aa4465] mb-3 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-[#AA4465] font-bold text-base lg:text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm leading-relaxed">
                {item.desc}
              </p>
              <div className="absolute top-3 left-3 text-[#AA4465]/10 font-black text-xl">
                {item.title[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;