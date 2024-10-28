import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import Navbar from './Navbar';
import profile from '../images/profile.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'

const Profile = () => {
  const user = useSelector(selectUser);

  const logout = () => {
    signOut(auth)
  }
  return (
    <div className='bg-[#000] h-screen flex flex-col items-center justify-center text-[#fff]'>
      <Navbar />
      <div className='w-[400px]'>
        <div className='p-1'>
          <h1 className='py-1 text-3xl border-b border-[#1F1F1F]'>Edit Profile</h1>
        </div>
        <div className='flex gap-6 p-3'>
          <img src={profile} className='w-[80px] h-[80px] object-contain'/>
          <div>
            <div className='flex flex-col gap-6 border-b border-[#1F1F1F]'>
              <p className='bg-[#808080] w-[280px] py-1 px-3'>{user.email}</p>
              <h1 className='text-xl'>Plans</h1>
            </div>
            <div>
              <p className='py-1'>Renewal Date: 11/01/2024</p>
              <div className='p-4 flex flex-col gap-6'>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm'>Premium plan</p>
                    <p className='text-xs'>4k + HRD</p>
                  </div>
                  <div>
                    <button className='bg-red-600 px-2 py-1'>Subscribe</button>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm'>Standard plan</p>
                    <p className='text-xs'>1080p</p>
                  </div>
                  <div>
                    <button className='bg-red-600 px-2 py-1'>Subscribe</button>
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div>
                    <p className='text-sm'>Basic plan</p>
                    <p className='text-xs'>720p</p>
                  </div>
                  <div>
                    <button className='bg-red-600 px-2 py-1'>Subscribe</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className='bg-red-600 w-full p-2' onClick={logout}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
