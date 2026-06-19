import React from 'react';
import { Search, CalendarDays, GraduationCap, Star } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { id: 1, title: 'Find Your Tutor', desc: 'Browse expert tutors based on subject, location, and availability.', icon: <Search className="w-8 h-8 text-white" /> },
    { id: 2, title: 'Book a Session', desc: 'Select your preferred time slot and confirm your learning session.', icon: <CalendarDays className="w-8 h-8 text-white" /> },
    { id: 3, title: 'Start Learning', desc: 'Join your scheduled class and begin improving your skills.', icon: <GraduationCap className="w-8 h-8 text-white" /> },
    { id: 4, title: 'Rate & Review', desc: 'Share your experience and help other students find great tutors.', icon: <Star className="w-8 h-8 text-white" /> },
  ];

  return (
    <section className="py-24 bg-[#AA4465]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-gray-900">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, index) => {
            // isLeft: 0, 2 (Even card) -> Left Column
            // isRight: 1, 3 (Odd card) -> Right Column
            const isLeft = index % 2 === 0;

            return (
              <React.Fragment key={step.id}>
                <div
                  className={`
                    p-8 bg-white rounded-3xl shadow-sm border border-pink-100 flex flex-col
                    ${isLeft ? "md:col-start-1 md:items-start md:text-left" : "md:col-start-2 md:items-end md:text-right"}
                    items-center text-center transition-transform hover:scale-105 duration-300
                  `}
                >
                  <div className="w-16 h-16 bg-[#AA4465] rounded-full flex items-center justify-center mb-6 shadow-md">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Step {step.id}: {step.title}</h3>
                  <p className="text-gray-500 text-sm max-w-sm">{step.desc}</p>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;