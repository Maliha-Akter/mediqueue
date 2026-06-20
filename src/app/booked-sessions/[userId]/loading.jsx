import React from 'react';

const LoadingPage = () => {
    return (
        <div className='flex flex-col gap-4 h-[80vh] items-center justify-center'>
            <p className="text-xl font-bold text-gray-600">All Booked Session related data Loading</p>
        
            <span className="loading loading-spinner text-[#AA4465] w-15 h-15"></span>
        </div>
    );
};

export default LoadingPage;