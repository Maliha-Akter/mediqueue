'use client';

import React from 'react';
import { FaBookOpen, FaClock, FaDollarSign, FaShieldAlt } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    { title: 'Verified Tutors', icon: <FaBookOpen className="w-8 h-8" />, desc: 'All tutors are carefully reviewed.' },
    { title: 'Flexible Sessions', icon: <FaClock className="w-8 h-8" />, desc: 'Book according to your schedule.' },
    { title: 'Affordable Rates', icon: <FaDollarSign className="w-8 h-8" />, desc: 'Match your specific budget.' },
    { title: 'Secure Platform', icon: <FaShieldAlt className="w-8 h-8" />, desc: 'Safe and reliable booking.' },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-gray-900 text-center mb-20">Why Choose MediQueue?</h2>

        <div className="flex flex-wrap justify-center items-center min-h-[400px] [perspective:1000px]">
          {features.map((item, index) => {
            const rotation = (index - (features.length - 1) / 2) * 8; 
            
            return (
              <div
                key={index}
                className="group relative w-56 h-72 bg-white rounded-3xl shadow-lg border-[1.5px] border-[#AA4465]/20 p-6 flex flex-col items-center text-center transition-all duration-500 ease-out hover:!translate-y-[-50px] hover:!rotate-0 hover:shadow-2xl cursor-pointer animate-[floating_4s_ease-in-out_infinite]"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  marginLeft: index === 0 ? '0' : '-20px',
                  zIndex: index,
                  animationDelay: `${index * 1}s`,
                  animationDuration: `${4 + index}s`
                }}
              >
                {/* Icon Rendering */}
                <div className="text-[#aa4465] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                
                {/* Text Content */}
                <h3 className="text-[#AA4465] font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                
                {/* Decorative Identifier */}
                <div className="absolute top-4 left-4 text-[#AA4465]/10 font-black text-2xl">
                    {item.title[0]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;