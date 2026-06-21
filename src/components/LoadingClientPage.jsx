import React from 'react';

const LoadingClientPage = () => {
    return (
        <div className='flex flex-col gap-4 items-center justify-center pt-1 pb-1'>
            
            <p className="text-xl font-bold text-white dark:text-white">
                All Tutors Data Loading...
            </p>

            <span className="loading loading-spinner text-[#ffffff] w-20 h-20"></span>
            
        </div>
    );
};

export default LoadingClientPage;