import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <nav className="w-full border-b border-gray-200 px-4 md:px-8 lg:px-16 py-4 bg-white">
    <div className="max-w-screen-xl mx-auto flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-12">
        <img
          src="/logo.svg" 
          alt="Notion logo"
          className="w-8 h-8 cursor-pointer"
        />
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
          <li className="hover:text-black cursor-pointer">Mail <span className="bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded ml-1 text-xs font-semibold">New</span></li>
          <li className="hover:text-black cursor-pointer">Calendar</li>
          <li className="hover:text-black cursor-pointer">AI</li>
          <li className="hover:text-black cursor-pointer">Enterprise</li>
          <li className="hover:text-black cursor-pointer">Pricing</li>
          <li className="hover:text-black cursor-pointer">Explore <span className="text-xs">▾</span></li>
          <li className="hover:text-black cursor-pointer">Request a demo</li>
        </ul>
      </div>

      {/* Right actions */}
      <div className="flex items-center space-x-4 text-sm font-medium">
        <Link to='/login'>
          <button className="text-gray-700 hover:text-black cursor-pointer">Log in</button>        
        </Link>
        <Link to='/register'>
          <button className="bg-[#1e1d1d] text-white hover:cursor-pointer px-4 py-2 rounded-md hover:opacity-90 transition">
            Get Cube Now
          </button>
        </Link>

      </div>
    </div>
  </nav>
  );
}
