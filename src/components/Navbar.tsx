'use client';
   
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react'; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);  
  
  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white px-4 py-3 gap-10 flex justify-start items-center">
        <div className="text-xl font-bold">MyApp</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 mr-5">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/History" className="hover:text-gray-300">History</Link> 
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 text-white px-4 py-2 space-y-2">
          <Link href="/" className="block hover:text-gray-300">Home</Link>
          <Link href="/todos" className="block hover:text-gray-300">Todos</Link>
          <Link href="/about" className="block hover:text-gray-300">About</Link>
        </div>
      )}
 
    </div>
  );
}
