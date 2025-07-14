import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import { nanoid } from 'nanoid';

const UserConnect = () => {
  const [userID, setUserID] = useState('');
  const [existingUserID, setExistingUserID] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [hasExistingUser, setHasExistingUser] = useState(false);
  const [activeTab, setActiveTab] = useState('new');
  const navigate = useNavigate();

  useEffect(() => {
    const existingUserId = localStorage.getItem('userId');
    if (existingUserId) {
      setHasExistingUser(true);
      setActiveTab('returning');
    }
  }, []);

  const generateUserId = () => {
    const newId = nanoid();
    setUserID(newId);
    enqueueSnackbar('User ID generated!', { variant: 'success' });
  }

  const handleContinueNewUser = () => {
    if (!userID) {
      enqueueSnackbar('Please generate an ID first.', { variant: 'warning' });
      return;
    }
    
    // Just store locally and proceed - no backend call yet
    localStorage.setItem('userId', userID);
    enqueueSnackbar('Welcome! You can now start adding books.', { variant: 'success' });
    navigate('/');
  }

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserID('');
    setExistingUserID('');
    setHasExistingUser(false);
    setActiveTab('new');
    enqueueSnackbar('You have been logged out.', { variant: 'info' });
    navigate('/user');
  }

  const handleConnectReturningUser = () => {
    if (!existingUserID.trim()) {
      enqueueSnackbar('Please enter your User ID.', { variant: 'warning' });
      return;
    }
    
    setLoading(true);
    axios
      .post('http://localhost:5555/users/verify', { userID: existingUserID })
      .then(response => {
        localStorage.setItem('userId', existingUserID);
        enqueueSnackbar('Welcome back!', { variant: 'success' });
        navigate('/');
      })
      .catch(error => {
        if (error.response?.status === 404) {
          enqueueSnackbar('User ID not found. Please check your ID or create a new one.', { variant: 'error' });
        } else {
          enqueueSnackbar('Error connecting. Please try again.', { variant: 'error' });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userID);
    enqueueSnackbar('ID copied to clipboard!', { variant: 'info' });
  }

  return (
    <div className="p-4">
      {hasExistingUser && <BackButton />}
      {hasExistingUser && (
        <button
          className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded"
          onClick={handleLogout}
        >
          Logout
        </button>)}
      <h1 className="text-3xl my-4">
        {hasExistingUser ? 'Switch User' : 'Welcome! Get Started'}
      </h1>

      {loading && <Spinner />}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl max-w-xl w-full p-4 mx-auto bg-white shadow-md">
        
        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`px-4 py-2 font-semibold transition ${
              activeTab === 'new'
                ? 'text-sky-600 border-b-2 border-sky-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('new')}
          >
            New User
          </button>
          <button
            className={`px-4 py-2 font-semibold ml-4 transition ${
              activeTab === 'returning'
                ? 'text-sky-600 border-b-2 border-sky-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('returning')}
          >
            Returning User
          </button>
        </div>

        {activeTab === 'new' && (
          <div>
            <div className="my-4">
              <label className="text-xl text-gray-600">Generate Your Unique ID</label>
              <button
                className="ml-4 p-2 bg-sky-300 hover:bg-sky-400 text-white font-medium rounded"
                onClick={generateUserId}
                disabled={loading}
              >
                Generate
              </button>
              <p className="text-sm text-gray-500 mt-2">
                This will create a unique identifier for your book collection.
              </p>
            </div>

            {userID && (
              <div className="my-4 p-4 bg-green-50 rounded border border-green-200">
                <label className="text-xl text-gray-600">Your New User ID:</label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-mono bg-white border-2 border-gray-500 px-4 py-2 rounded flex-1 select-all overflow-x-auto">
                    {userID}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-sky-300 hover:bg-sky-400 text-white rounded"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-sm text-green-700 mt-2 font-semibold">
                  ⚠️ IMPORTANT: Save this ID somewhere safe! You'll need it to access your books later.
                </p>
              </div>
            )}

            <button
              className={`p-2 mt-6 w-full rounded text-white ${
                userID
                  ? 'bg-sky-400 hover:bg-sky-500'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              onClick={handleContinueNewUser}
              disabled={!userID}
            >
              Continue with This ID
            </button>
          </div>
        )}

        {activeTab === 'returning' && (
          <div>
            <div className="my-4">
              <label className="text-xl text-gray-600">Enter Your User ID</label>
              <input
                type="text"
                placeholder="Paste your User ID here"
                value={existingUserID}
                onChange={(e) => setExistingUserID(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full mt-2 rounded"
                disabled={loading}
              />
              <p className="text-sm text-gray-500 mt-2">
                Enter the ID that was previously generated for you.
              </p>
            </div>

            <button
              className={`p-2 mt-6 w-full rounded text-white ${
                existingUserID.trim()
                  ? 'bg-sky-400 hover:bg-sky-500'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              onClick={handleConnectReturningUser}
              disabled={loading || !existingUserID.trim()}
            >
              {loading ? 'Verifying...' : 'Connect'}
            </button>
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mt-4">
          Note: User IDs are cryptographically generated to prevent collisions.
        </p>
      </div>
    </div>

  );
}

export default UserConnect;