import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';

const UserConnect = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-neutral-400 p-4">
      <h1 className="text-3xl font-bold mb-4">Connect User</h1>
      <p className="text-lg mb-8">This page is under construction.</p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back Home
      </button>
    </div>
  );
}


export default UserConnect;