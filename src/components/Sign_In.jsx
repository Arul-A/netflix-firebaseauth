import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from 'firebase/firestore';

const Sign_In = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async (e) => {
    e.preventDefault();
    try {
        const authUser = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db,'users',authUser.user.uid),{
          favShows:[],
          plan:null,
          renewalDate:null,
        })
        setEmail('')
        setPassword('')
      }catch(err) {
        alert(err.message)
      }
  }

  const signin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        setEmail('')
        setPassword('')
      })
      .catch((err) => {
        alert(err.message)
      })
  }
  return (
    <div className="flex justify-center items-center bg-transparent">
      <div className="w-full max-w-md p-8 space-y-8 bg-black rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 mt-1 text-black rounded-md focus:outline-none focus:ring focus:border-red-500"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 text-black rounded-md focus:outline-none focus:ring focus:border-red-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full py-2 mt-4 text-lg font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              onClick={signin}
            >
              Sign In
            </button>
          </div>

          <div className="flex items-center justify-between mt-6">
            <span className="text-sm text-gray-400 hover:underline cursor-pointer">
              Forgot password?
            </span>
            <span className="text-sm text-gray-400 hover:underline cursor-pointer" onClick={register}>
              New to Netflix? Sign up now
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign_In;
