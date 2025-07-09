import React from 'react'
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import "./hover.css";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-separate table-fixed">
      <thead>
        <tr>
          <th className="w-16 border border-slate-600 rounded-md">#</th>
          <th className="w-1/3 border border-slate-600 rounded-md">Title</th>
          <th className="w-1/4 border border-slate-600 rounded-md max-md:hidden">Author</th>
          <th className="w-24 border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
          <th className="w-32 border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="emblem text-center">
              <div className="px-2">
                {index + 1}
              </div>
            </td>
            <td className="emblem text-center">
              <div className="truncate px-2" title={book.title}>
                {book.title}
              </div>
            </td>
            <td className="emblem text-center max-md:hidden">
              <div className="truncate px-2" title={book.author}>
                {book.author}
              </div>
            </td>
            <td className="emblem text-center max-md:hidden">
              <div className="px-2">
                {book.publishYear}
              </div>
            </td>
            <td className="emblem text-center">
              <div className="flex justify-center gap-x-4 px-2">
                <Link to={`/books/details/${book._id}`}>
                  <BsInfoCircle className="text-2xl text-green-800" />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <AiOutlineEdit className="text-2xl text-yellow-600" />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <MdOutlineDelete className="text-2xl text-red-600" />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default BooksTable