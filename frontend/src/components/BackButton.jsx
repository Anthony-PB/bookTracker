import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({destination = '/'}) => {
  return (
    <div className='flex'>
        <Link
        to = {destination}
        className= 'group relative border border-gray-300 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-5 py-2 rounded-lg w-fit transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-black hover:border-gray-400'
        >
        <div className='relative overflow-hidden'>
          <BsArrowLeft className='text-xl group-hover:-translate-x-8 transition-transform duration-300'/>
          <BsArrowLeft className='text-xl absolute top-0 left-0 translate-x-8 group-hover:translate-x-0 transition-transform duration-300'/>
        </div>
        </Link>
    </div>
  )
}

export default BackButton