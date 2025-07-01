import { useState } from "react";
import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import BookModal from "./BookModal";

const BookSingleCard = (book) => {
  book = book.book;
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <div
        key={book._id}
        className={`relative bg-white rounded-xl shadow-lg transition-all duration-500 overflow-hidden border border-gray-200 m-4 ${
          showModal ? 'scale-[1.02] shadow-2xl' : 'hover:shadow-2xl hover:scale-[1.02]'
        }`}
      >
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 relative">
          <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-gray-800 font-semibold text-sm">
            {book.publishYear}
          </div>
          
          <div className="space-y-3 pr-20">
            <div className="flex items-center space-x-3 text-white">
              <PiBookOpenTextLight className="text-2xl text-gray-300" />
              <h2 className="text-lg font-bold truncate">{book.title}</h2>
            </div>
            
            <div className="flex items-center space-x-3 text-white">
              <BiUserCircle className="text-2xl text-gray-300" />
              <h3 className="text-gray-300 truncate">{book.author}</h3>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-xs text-gray-500 font-mono mb-4 truncate">ID: {book._id}</p>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowModal(true)}
              className="group p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-200"
            >
              <BiShow className="text-xl text-blue-600 group-hover:scale-110 transition-transform duration-200" />
            </button>
            
            <Link 
              to={`/books/details/${book._id}`}
              className="group p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-all duration-200"
            >
              <BsInfoCircle className="text-xl text-green-600 group-hover:scale-110 transition-transform duration-200" />
            </Link>
            
            <Link 
              to={`/books/edit/${book._id}`}
              className="group p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-all duration-200"
            >
              <AiOutlineEdit className="text-xl text-yellow-600 group-hover:scale-110 transition-transform duration-200" />
            </Link>
            
            <Link 
              to={`/books/delete/${book._id}`}
              className="group p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-200"
            >
              <MdOutlineDelete className="text-xl text-red-600 group-hover:scale-110 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>

      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default BookSingleCard;