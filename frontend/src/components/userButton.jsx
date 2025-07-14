import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserButton = ({destination='/user'}) => {
    const navigate = useNavigate();
    return (
        <div className='flex'>
            <button
                onClick={() => navigate(destination)}
                className='group relative border border-gray-300 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-5 py-2 rounded-lg w-fit transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-black hover:border-gray-400'
            >
                <span className='text-xl'>User</span>
            </button>
        </div>
    );
}

export default UserButton;