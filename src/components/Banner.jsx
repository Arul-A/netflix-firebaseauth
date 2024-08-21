import React, { useEffect, useState } from 'react';
import axios from '../helpers/axios';
import requests from '../helpers/request';

const Banner = () => {
  const [movie, setMovie] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
      return request;
    };
    fetchData();
  }, []);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  };


  return (
    <header className="relative h-[440px] text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 md:w-1/3 w-1/2 ml-20 flex flex-col justify-center h-full px-8">
        <div>
          <h1 className="md:text-4xl font-bold text-2xl">
            {movie?.title || movie?.name || movie?.original_title}
          </h1>
        </div>
        <div className="flex gap-3 justify-start items-center mt-4">
          <button className="cursor-pointer font-medium bg-[rgba(51,51,51,0.5)] px-4 py-1 hover:bg-slate-100 hover:text-black rounded transition-all duration-300">
            Play
          </button>
          <button className="cursor-pointer font-medium bg-[rgba(51,51,51,0.5)] px-4 py-1 hover:bg-slate-100 hover:text-black rounded transition-all duration-300">
            My List
          </button>
        </div>
        <div className="mt-3">
          <p>{truncate(movie?.overview, 150)}</p>
        </div>
      </div>
    </header>
  );
};

export default Banner;
