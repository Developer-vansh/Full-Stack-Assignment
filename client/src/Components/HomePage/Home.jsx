import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const Navigate=useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 relative">
      <button onClick={()=> {localStorage.clear(); window.location.reload()}} className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Logout
      </button>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome {localStorage.getItem('username')}!!!</h1>
        <div className="space-y-4">
          <button onClick={()=>Navigate('/posts')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            View Posts
          </button>
        </div>
      </div>
    </div>
  );
}
