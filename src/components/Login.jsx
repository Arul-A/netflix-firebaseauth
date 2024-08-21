import React, { useState } from 'react';
import logo from '../images/netflix.png';
import Sign_In from './Sign_In';

const Login = () => {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="relative text-white min-h-screen bg-cover bg-center bg-[url('https://i.redd.it/zjgs096khv591.jpg')]">
      {/* Linear Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

      {/* Content */}
      <div className="relative flex justify-between items-center p-2">
        <img src={logo} alt="netflix-logo" className='w-[100px] h-[50px] object-contain ml-5 cursor-pointer' />
        <button className='bg-red-600 text-white px-3 py-1 font-semibold rounded-sm mr-5' onClick={() => setSignIn(curr => !curr)}>
          Sign In
        </button>
      </div>
      
      <div className="relative flex flex-col items-center justify-center text-center px-4 mt-14">
        {signIn ? (
          <Sign_In />
        ) : (
          <div className="space-y-4 max-w-lg">
            <h1 className="text-4xl font-bold">Unlimited films, TV programs, and more.</h1>
            <h2 className="text-2xl font-semibold">Watch anywhere. Cancel at any time.</h2>
            <h3 className="text-lg font-medium">Ready to watch? Enter your email to create or restart your membership.</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center w-full">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="p-3 w-full sm:w-auto flex-grow rounded-sm text-black"
              />
              <button className="bg-red-600 text-white p-3 mt-4 sm:mt-0 sm:ml-2 rounded-sm font-semibold" onClick={()=>setSignIn(true)}>
                GET STARTED
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
