"use client"
import React from 'react';
import { Search, CalendarDays, GraduationCap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, title: 'Find Your Tutor', desc: 'Browse expert tutors based on subject, location, and availability.', icon: <Search className="w-8 h-8 text-[#AA4465]" /> },
  { id: 2, title: 'Book a Session', desc: 'Select your preferred time slot and confirm your learning session.', icon: <CalendarDays className="w-8 h-8 text-[#AA4465]" /> },
  { id: 3, title: 'Start Learning', desc: 'Join your scheduled class and begin improving your skills.', icon: <GraduationCap className="w-8 h-8 text-[#AA4465]" /> },
  { id: 4, title: 'Rate & Review', desc: 'Share your experience and help other students find great tutors.', icon: <Star className="w-8 h-8 text-[#AA4465]" /> },
];

const HowItWorks = () => {
  return (
    <motion.section 
      initial={{ backgroundColor: "#ffffff" }}
      whileInView={{ backgroundColor: "#AA4465" }}
      transition={{ duration: 5, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.5 }}
      className="py-24"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ color: "#111827" }}
            whileInView={{ color: "#ffffff" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-4xl font-black"
          >
            How It Works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={step.id}
                className={`
                  p-8 bg-white rounded-3xl shadow-lg flex flex-col
                  ${isLeft ? "md:col-start-1 md:items-start md:text-left" : "md:col-start-2 md:items-end md:text-right"}
                  items-center text-center
                `}
              >
                <div className="w-16 h-16 bg-[#FFF5F8] rounded-full flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Step {step.id}: {step.title}</h3>
                <p className="text-gray-600 text-sm max-w-sm">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorks;