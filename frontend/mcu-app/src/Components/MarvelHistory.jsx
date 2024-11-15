import React from 'react'

const MarvelHistory = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center py-16">
          <div className="container mx-auto flex flex-col md:flex-row items-center bg-zinc-900 rounded-lg shadow-lg p-10 gap-12 w-4/5 max-w-6xl">
            
            {/* Movie Poster */}
            <div className="w-full md:w-1/3 flex justify-center">
              <img
                className="rounded-lg shadow-lg object-cover h-[25rem] w-[18rem] border-2 border-gray-800"
                src="https://th.bing.com/th/id/OIP.MojyWSAyNhhfgIxo-ub-ywHaKX?w=208&h=291&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                
              />
            </div>
    
            {/* Movie Details */}
            <div className="w-full md:w-2/3 text-white">
              <h1>STAN LEE</h1>
    
              {/* Extra Info Section */}
              <div className="flex flex-col gap-4 text-lg">
                Date
              </div>
    
             
    
              
            </div>
          </div>   
        </div>
      );
}

export default MarvelHistory
