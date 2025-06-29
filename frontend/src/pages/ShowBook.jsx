import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load book details');
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
      <div className='max-w-4xl mx-auto'>
        <BackButton />
        
        <div className='mt-8 mb-6'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Book Details</h1>
          <div className='w-20 h-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full'></div>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <Spinner />
          </div>
        ) : error ? (
          <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 text-center'>
            <div className='text-xl font-semibold mb-2'>Error</div>
            <div>{error}</div>
          </div>
        ) : (
          <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
            <div className='bg-gradient-to-r from-gray-800 to-gray-900 p-6'>
              <h2 className='text-2xl font-bold text-white'>{book.title || 'Untitled'}</h2>
              <p className='text-gray-300 mt-1'>by {book.author || 'Unknown Author'}</p>
            </div>
            
            <div className='p-8 space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='group'>
                  <div className='flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300'>
                    <div className='w-3 h-3 bg-gray-600 rounded-full group-hover:bg-gray-700 transition-colors duration-300'></div>
                    <div>
                      <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>Book ID</span>
                      <p className='text-gray-800 font-mono text-sm mt-1'>{book._id || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className='group'>
                  <div className='flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300'>
                    <div className='w-3 h-3 bg-gray-600 rounded-full group-hover:bg-gray-700 transition-colors duration-300'></div>
                    <div>
                      <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>Publish Year</span>
                      <p className='text-gray-800 text-lg font-medium mt-1'>{book.publishYear || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className='group'>
                  <div className='flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300'>
                    <div className='w-3 h-3 bg-gray-600 rounded-full group-hover:bg-gray-700 transition-colors duration-300'></div>
                    <div>
                      <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>Created</span>
                      <p className='text-gray-800 text-sm mt-1'>{formatDate(book.createdAt)}</p>
                    </div>
                  </div>
                </div>

                <div className='group'>
                  <div className='flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300'>
                    <div className='w-3 h-3 bg-gray-600 rounded-full group-hover:bg-gray-700 transition-colors duration-300'></div>
                    <div>
                      <span className='text-sm font-semibold text-gray-500 uppercase tracking-wide'>Last Updated</span>
                      <p className='text-gray-800 text-sm mt-1'>{formatDate(book.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;