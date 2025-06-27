import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();
  const handleSaveBook = () => {
    const trimmedTitle = title.trim();
    const trimmedAuthor = author.trim();
    if (!title || !trimmedTitle) {
      alert("Title is required!");
      return;
    }else if (!author || !trimmedAuthor) {
      alert("Author is required!");
      return;
    }
    const trimmedYear = publishYear.trim();
    const yearAsNumber = parseInt(trimmedYear);

    if (isNaN(yearAsNumber)) {
      alert("Please enter a valid year");
      return;
    }
    const data = {
      title: trimmedTitle,
      author: trimmedAuthor,
      publishYear: yearAsNumber
    };
    setLoading(true);
    axios
    .post('http://localhost:5555/books', data)
    .then(()=> {
      setLoading(false);
      enqueueSnackbar('Book Creation Successful', { variant: 'success' });
      navigate('/');
    }).catch((error) => {
      setLoading(false);
      enqueueSnackbar('An Error Occurred', { variant: 'error' });
      console.log(error);
    })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col bg-amber-50 border-l-amber-800 border-r-amber-50 border-8 rounded-sm border-amber-800 round-xl  w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Title</label>
          <input
          type = 'text'
          value = {title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-2 border-black px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Author</label>
          <input
          type = 'text'
          value = {author}
          onChange={(e) => setAuthor(e.target.value)}
          className='border-2 border-black px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-black'>Publish Year</label>
          <input
          type = 'number'
          step = "1"
          value = {publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
          className='border-2 border-black px-4 py-2 w-full'
          />
        </div>
      <button
        className='p-3 px-6 rounded-md bg-white border-l-4 border-amber-800 
                  shadow-md hover:shadow-xl transition-shadow duration-200 
                  text-amber-900 font-sans relative'
        onClick={handleSaveBook}
      >
        📖 Save Book
      </button>
      </div>
    </div>
  )
}

export default CreateBook