import React, { useEffect, useState } from 'react';
import netflix from '../images/netflix.png';
import profile from '../images/profile.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [background, setBackground] = useState(false); // Set initial state to false

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBackground(true);
      } else {
        setBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-colors duration-300 ${background ? 'bg-[#000]' : 'bg-transparent'}`}>
      <div className='flex justify-between items-center'>
        <Link to='/'>
            <img src={netflix} alt="netflix-logo" className='w-[100px] h-[50px] object-contain ml-5 cursor-pointer' />
        </Link>
        <Link to='/profile'>
          <img src={profile} alt="profile" className='w-[50px] h-[35px] object-contain mr-5 cursor-pointer' />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
