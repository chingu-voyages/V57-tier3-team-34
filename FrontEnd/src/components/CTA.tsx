import React from 'react'
import { Link } from 'react-router'
const CTA = () => {
  return (
  <div className='bg-gradient-to-br from-gray-900 via-black to-gray-900'>
   <div className="py-20 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border-y border-white/20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Make Your Voice Heard?</h2>
          <p className="text-xl text-gray-300 mb-8">Join millions of Nigerians participating in shaping our nation's future.</p>
         <Link to="/voter/register">
          <button className="bg-white text-black px-10 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl shadow-white/20">
            Get Started Today
          </button>
          </Link>
        </div>
      </div>

      <div className="py-12 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <span className="text-white text-sm font-semibold">TRUSTED BY:</span>
            <div className="text-white/80 font-bold">INEC</div>
            <div className="text-white/80 font-bold">Federal Government</div>
            <div className="text-white/80 font-bold">State Governments</div>
            <div className="text-white/80 font-bold">Electoral Commission</div>
          </div>
        </div>
      </div>
    
  </div>
  
  )
}

export default CTA