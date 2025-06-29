import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, SetShowType] = useState("table");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      await sleep(1750); // wait 1.750 seconds to simulate loading
      try {
        const response = await axios.get("http://localhost:5555/books");
        setBooks(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className={`relative border-2 border-gray-800 px-6 py-3 font-semibold uppercase tracking-wide text-sm transition-all duration-300 hover:bg-gray-800 hover:text-white before:absolute before:left-4 before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-gray-800 before:transition-all before:duration-300 hover:before:bg-white ${
            showType === 'table' ? 'bg-gray-800 text-white before:bg-white' : 'bg-transparent text-gray-800'
          }`}
          onClick={() => SetShowType("table")}
        >
          <span className="pl-8">Table</span>
        </button>
        
        <button
          className={`relative border-2 border-gray-800 px-6 py-3 font-semibold uppercase tracking-wide text-sm transition-all duration-300 hover:bg-gray-800 hover:text-white before:absolute before:left-4 before:top-1/2 before:h-0.5 before:w-4 before:-translate-y-1/2 before:bg-gray-800 before:transition-all before:duration-300 hover:before:bg-white ${
            showType === 'card' ? 'bg-gray-800 text-white before:bg-white' : 'bg-transparent text-gray-800'
          }`}
          onClick={() => SetShowType("card")}
        >
          <span className="pl-8">Card</span>
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType == "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Home;
