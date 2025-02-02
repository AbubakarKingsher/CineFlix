import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { FaFire } from "react-icons/fa";
import MovieCard from "./MoiveCard";
import { removePerson } from "../../store/Redusers/PersonSlice";
import { personApi } from "../../store/Actions/personAction";

function PeopleDetail() {

    const [more, setMore] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();

    const { info } = useSelector((state) => state.person);

    useEffect(() => {
        dispatch(personApi(id));

        return () => {
            dispatch(removePerson());
        };
    }, [id]);

    return info ? (
        <div
            className="hero relative min-h-screen w-full bg-center bg-cover bg-no-repeat text-white"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 100%), url(${"https://image.tmdb.org/t/p/original/" + info.detail.profile_path
                    })`,
            }}
        >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>
            <div className="flex items-center md:justify-center h-full w-full relative z-50 flex-wrap">
                <div className="p-10 h-full">
                    <img
                        className="rounded w-46"
                        src={
                            info.detail.profile_path
                                ? "https://image.tmdb.org/t/p/original/" +
                                info.detail.profile_path || info.detail.backdrop_path
                                : "https://photosnow.net/wp-content/uploads/2024/04/no-dp-mood-off_9.jpg"
                        }
                    />
                </div>
                <div className="h-full md:w-1/2 w-full pt-5 pl-10 pb-5 pr-5 md:p-10">
                    <h1 className="text-3xl font-medium">
                        {info.detail.title ||
                            info.detail.original_title ||
                            info.detail.name}
                    </h1>
                    <span className="text-2xl opacity-70 font-light my-2 flex items-center gap-2">
                        <h3>Birthday</h3>
                        {info.detail.birthday}
                    </span>
                    <div className="flex text-xl items-center gap-2">
                        Popularity
                        <FaFire size={30} color="red" />
                        <span className="my-1">
                            {info.detail.popularity}
                        </span>
                    </div>
                    <p className=' text-sm w-[70%] mt-2'>{more ? info.detail.biography : info.detail.biography.slice(0, 200)} {info.detail.biography.length > 200 && <span onClick={() => setMore(!more)} className='text-blue-500 cursor-pointer'>{more ? "less" : "more..."}</span>}</p>
                </div>

            </div>
            {info.movieCredits.crew.length > 0 ? (
                <div className="overflow-hidden">
                    <h2 className="mt-10 px-5 font-medium opacity-70 mb-5 text-xl">
                        Recommendations
                    </h2>
                    <div className="card h-full w-full flex items-center gap-5 overflow-auto px-10 mb-10">
                        {info.movieCredits.crew.map((item, idx) => (
                            <MovieCard data={item} key={idx} title="movie" />
                        ))}
                    </div>
                </div>
            ) : info.movieCredits.cast.length > 0 ? (
                <div className="overflow-hidden">
                    <h2 className="mt-10 px-5 font-medium opacity-70 mb-5 text-xl">
                        Similar Stuff
                    </h2>
                    <div className="card h-full w-full flex items-center gap-5 overflow-auto px-10 mb-10">
                        {info.movieCredits.cast.map((item, idx) => (
                            <MovieCard data={item} key={idx} title="movie" />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    ) : (
        <Loading />
    );
}

export default PeopleDetail;
