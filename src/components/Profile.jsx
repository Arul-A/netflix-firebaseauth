import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import Navbar from './Navbar';
import profile from '../images/profile.png';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const Profile = () => {
  const user = useSelector(selectUser);
  const [currentPlan, setCurrentPlan] = useState('');
  const [renewalDate, setRenewalDate] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setCurrentPlan(data.plan || '');
        setRenewalDate(data.renewalDate || 'No Active Subscription');
      }
    };
    fetchUserData();
  }, []);

  const updatePlan = async (newPlan) => {
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const newRenewalDate = new Date();
    newRenewalDate.setDate(newRenewalDate.getDate() + 30); // Set renewal date to 30 days from now

    await updateDoc(userRef, {
      plan: newPlan,
      renewalDate: newRenewalDate.toLocaleDateString(), // Format as needed
    });

    setCurrentPlan(newPlan);
    setRenewalDate(newRenewalDate.toLocaleDateString());
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <div className='bg-[#000] h-screen flex flex-col items-center justify-center text-[#fff]'>
      <Navbar />
      <div className='w-[400px]'>
        <div className='p-1'>
          <h1 className='py-1 text-3xl border-b border-[#1F1F1F]'>Edit Profile</h1>
        </div>
        <div className='flex gap-6 p-2'>
          <img src={profile} className='w-[80px] h-[80px] object-contain' alt="Profile" />
          <div>
            <div className='flex flex-col gap-6 border-b border-[#1F1F1F]'>
              <p className='bg-[#808080] w-[280px] py-1 px-3'>{user.email}</p>
              <h1 className='text-xl'>Plans</h1>
            </div>
            <div>
              <p className='py-1'>Renewal Date: {renewalDate}</p>
              <div className='p-4 flex flex-col gap-3'>
                {[{'plan':'Premium','cost':'₹399/Month'}, {'plan':'Standard','cost':'₹299/Month'}, {'plan':'Premium','cost':'₹199/Month'}].map(data => (
                  <div className='flex gap-3 items-center' key={data.plan}>
                    <div>
                      <p className='text-sm'>{data.plan} - {data.cost}</p>
                      <p className='text-xs'>{data.plan === 'Premium' ? '4k + HDR & upto 4 devices' : data.plan === 'Standard' ? '1080p & upto 2 devices' : '720p & 1 device only'}</p>
                    </div>
                    <div>
                      {currentPlan === data.plan ? (
                        <button className='bg-gray-600 px-2 py-1' disabled>Subscribed</button>
                      ) : (
                        <button className='bg-red-600 px-3 py-1' onClick={() => updatePlan(data.plan)}>Subscribe</button>
                      )}
                    </div>
                  </div>
                ))}
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
};

export default Profile;
