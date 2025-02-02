import React from 'react'
import { Link } from 'react-router-dom';

const MovieCard = ({ data, title }) => {


    return (
        <Link to={`/${data.media_type || title}/details/${data.id}`}>
            <div className="relative w-40 h-52 rounded-lg overflow-hidden shadow-lg shrink-0">
                <img
                    src={data.poster_path ? ("https://image.tmdb.org/t/p/original/" + data.poster_path || data.backdrop_path) : data.profile_path ? "https://image.tmdb.org/t/p/original/" + data.profile_path : "https://photosnow.net/wp-content/uploads/2024/04/no-dp-mood-off_9.jpg"}

                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className=" text-xl font-medium truncate text-center">{data.title || data.name}</h3>
                </div>
            </div>
        </Link>
    );
};



export default MovieCard;
