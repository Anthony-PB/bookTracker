import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import { MdDeleteForever, MdWarning } from 'react-icons/md';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deletion Successful', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('An Error Occurred', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 to-gray-100 p-6'>
      <div className='max-w-2xl mx-auto'>
        <BackButton />
        
        <div className='mt-8 mb-6'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Delete Book</h1>
          <div className='w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full'></div>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <Spinner />
          </div>
        ) : (
          <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>

            <div className='bg-gradient-to-r from-red-500 to-red-600 p-6'>
              <div className='flex items-center space-x-3'>
                <MdWarning className='text-white text-3xl' />
                <h2 className='text-2xl font-bold text-white'>Danger Zone</h2>
              </div>
              <p className='text-red-100 mt-2'>This action cannot be undone</p>
            </div>
            
            <div className='p-8 text-center'>
              <div className='mb-6'>
                <MdDeleteForever className='text-red-500 text-6xl mx-auto mb-4' />
                <h3 className='text-2xl font-bold text-gray-800 mb-3'>
                  Are you sure you want to delete this book?
                </h3>
                <p className='text-gray-600 text-lg'>
                  This will permanently remove the book from your collection. 
                  This action cannot be reversed.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button
                  onClick={() => navigate(-1)}
                  className='relative border-2 border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md before:absolute before:left-4 before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-gray-400 before:transition-all before:duration-300'
                >
                  <span className='pl-6'>Cancel</span>
                </button>
                
                <button
                  onClick={handleDeleteBook}
                  className='group relative border-2 border-red-500 bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:from-red-600 hover:to-red-700 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 before:absolute before:left-4 before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-white before:transition-all before:duration-300'
                >
                  <span className='pl-6 flex items-center space-x-2'>
                    <MdDeleteForever className='text-xl' />
                    <span>Yes, Delete Forever</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteBook;