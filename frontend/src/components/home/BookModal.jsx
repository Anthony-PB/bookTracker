import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
          >
            <AiOutlineClose className="text-white text-xl group-hover:rotate-90 transition-transform duration-300" />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <PiBookOpenTextLight className="text-white text-3xl min-w-10 min-h-10" />
            <h2 className="text-2xl font-bold text-white truncate">{book.title}</h2>
          </div>
          
          <div className="flex items-center space-x-2">
            <BiUserCircle className="text-gray-300 text-xl min-w-10 min-h-6" />
            <p className="text-gray-300 truncate">by {book.author}</p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="group">
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                <div className="w-3 h-3 bg-gray-600 rounded-full group-hover:bg-gray-700 transition-colors duration-300"></div>
                <div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Published</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <MdDateRange className="text-gray-600 text-lg" />
                    <p className="text-gray-800 text-xl font-bold">{book.publishYear}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                <div className="w-3 h-3 bg-gray-600 rounded-full group-hover:bg-gray-700 transition-colors duration-300"></div>
                <div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Book ID</span>
                  <p className="text-gray-800 font-mono text-sm mt-1 break-all">{book._id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookModal;