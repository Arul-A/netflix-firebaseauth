import React, { useEffect, useState } from 'react';
import axios from '../helpers/axios';
import '../App.css'

const Row = ({ title, fetchUrl, isLarge }) => {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        };
        fetchData();
    }, [fetchUrl]);

    return (
        <div>
            <h2 className='text-white font-bold ml-5 mt-2'>{title}</h2>
            <div className="flex overflow-y-hidden overflow-x-scroll p-5 no-scrollbar" >
                {movies.map((movie) => (
                    ((isLarge && movie.poster_path) || (!isLarge && movie.backdrop_path)) && (
                        <img
                            key={movie.id}
                            className={`max-h-[100px] object-contain mr-3 transform transition-transform duration-300 hover:scale-110 ${isLarge ? "max-h-[250px]" : ""}`}
                            src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name || movie.title}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default Row;
