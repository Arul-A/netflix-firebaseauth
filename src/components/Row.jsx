import React, { useEffect, useState } from 'react';
import axios from '../helpers/axios';
import '../App.css';
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Row = ({ title, fetchUrl, isLarge }) => {
    const [movies, setMovies] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        };
        fetchData();
    }, [fetchUrl]);

    useEffect(() => {
        const fetchLikedMovies = async () => {
            if (auth.currentUser) {
                const userRef = doc(db, 'users', auth.currentUser.uid); 
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setLikedMovies(userDoc.data().favShows || []);
                }
            }
        };
        fetchLikedMovies();
    }, []);

    const toggleLike = async (movieId) => {
        const newLikedMovies = likedMovies.includes(movieId)
            ? likedMovies.filter(id => id !== movieId)
            : [...likedMovies, movieId];

        setLikedMovies(newLikedMovies);

        if (auth.currentUser) {
            const userRef = doc(db, 'users', auth.currentUser.uid);
            await setDoc(userRef, { favShows: newLikedMovies }, { merge: true });
        }
    };

    return (
        <div>
            <h2 className='text-white font-bold ml-5 mt-2'>{title}</h2>
            <div className='flex overflow-x-scroll overflow-y-hidden no-scrollbar p-5'>
                {movies.map((movie) => (
                    ((isLarge && movie.poster_path) || (!isLarge && movie.backdrop_path)) && (
                        <div key={movie.id} className={`${isLarge ? 'h-[250px] w-[180px]' : 'h-[100px] w-[220px]'} mr-3 flex-shrink-0 relative transform transition-transform duration-300 hover:scale-105`}>
                            <img
                                className='object-cover w-full h-full'
                                src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name || movie.title}
                            />
                            {!isLarge && (
                                <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100'>
                                    <p className='absolute text-white top-14 text-xs left-2 font-bold cursor-default'>{movie.name || movie.title}</p>
                                    {likedMovies.includes(movie.id) ?
                                        <FaHeart className='text-red-600 text-lg absolute right-2 top-2 hover:cursor-pointer' onClick={() => toggleLike(movie.id)} /> :
                                        <FaRegHeart className='text-gray-400 text-lg absolute right-2 top-2 hover:cursor-pointer' onClick={() => toggleLike(movie.id)} />
                                    }
                                </div>
                            )}
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Row;
