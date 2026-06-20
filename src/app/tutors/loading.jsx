import React from 'react';

const LoadingPage = () => {
    return (
        <div className='flex flex-col gap-4 h-[80vh] items-center justify-center'>
            <p className="text-xl font-bold text-gray-600">All Tutors Data Loading</p>
           
            <span className="loading loading-spinner text-[#AA4465] w-20 h-20"></span>
        </div>
    );
};

export default LoadingPage;