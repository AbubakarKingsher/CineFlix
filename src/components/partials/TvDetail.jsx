import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { FaPlay, FaStar } from "react-icons/fa";
import MovieCard from "./MoiveCard";
import { tvApi } from "../../store/Actions/tvAction";
import { removeTv } from "../../store/Redusers/TvSlice";
import Trailer from "./Trailer";

function TvDetail() {

    const [showTrailer, setShowTrailer] = useState("hidden")

    const { id } = useParams();
    const dispatch = useDispatch();

    const { info } = useSelector((state) => state.tv);

    const hours = Math.floor(info && info.detail.runtime / 60);
    const remainingMinutes = info && info.detail.runtime % 60;

    useEffect(() => {
        dispatch(tvApi(id));

        return () => {
            dispatch(removeTv());
        };
    }, [id]);

    return info ? (
        <div
            className="hero relative min-h-screen w-full bg-center bg-cover bg-no-repeat text-white"
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 100%), url(${"https://image.tmdb.org/t/p/original/" + info.detail.backdrop_path ||
                    info.detail.profile_path || info.detail.poster_path
                    })`,
            }}
        >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>
            <div className="flex items-center md:justify-center h-full w-full relative z-50 flex-wrap">
                <div className="p-10 h-full">
                    <img
                        className="rounded w-46"
                        src={info.detail.poster_path ?
                            ("https://image.tmdb.org/t/p/original/" +
                                info.detail.poster_path ||
                                info.detail.belongs_to_collection.poster_path ||
                                info.detail.backdrop_path) : "https://photosnow.net/wp-content/uploads/2024/04/no-dp-mood-off_9.jpg"
                        }

                    />
                </div>
                <div className="h-full md:w-1/2 w-full pt-5 pl-10 pr-5 md:p-10">
                    <h1 className="text-3xl font-medium">{info.detail.title || info.detail.original_title || info.detail.name}</h1>
                    <h3 className="text-2xl opacity-70 font-light my-2">{info.detail.release_date || info.detail.first_air_date.slice(0, 4)}</h3>
                    <div className="text-sm">
                        <span className="opacity-70">{hours + "hr" + " " + remainingMinutes + " " + "min"} |{" "}</span>
                        <span className="font-medium">
                            {info.detail.genres.map((item, idx) => (
                                <span key={idx}>{item.name + ", "}</span>
                            ))}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaStar size={30} color="#f3ce13" />
                        <span className="text-3xl my-2">
                            {(info.detail.vote_average * 10).toFixed()}%
                        </span>
                        <img className="w-[32px]" src="/assets/imdb.png" />
                    </div>
                    <p className="text-sm opacity-70">{info.detail.overview}</p>

                    <button onClick={() => setShowTrailer("block")} className='mt-5 h-11 cursor-pointer px-5 bg-[#002C44] rounded-full'><FaPlay className='inline-block mr-2' color='white' /> Watch trailer</button>
                </div>
                {info.recommendations.results.length > 0 ? (
                    <div className="overflow-hidden">
                        <h2 className="mt-10 px-5 font-medium opacity-70 mb-5 text-xl">
                            Recommendations
                        </h2>
                        <div className="card h-full w-full flex items-center gap-5 overflow-auto px-10 mb-10">
                            {info.recommendations.results.map((item, idx) => (
                                <MovieCard data={item} key={idx} title="movie" />
                            ))}
                        </div>
                    </div>
                ) : info.similar.results.length > 0 ? (
                    <div className="overflow-hidden">
                        <h2 className="mt-10 px-5 font-medium opacity-70 mb-5 text-xl">
                            Similar Stuff
                        </h2>
                        <div className="card h-full w-full flex items-center gap-5 overflow-auto px-10 mb-10">
                            {info.similar.results.map((item, idx) => (
                                <MovieCard data={item} key={idx} title="movie" />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
            <Trailer show={[showTrailer, setShowTrailer]} />
        </div>
    ) : (
        <Loading />
    );
}

export default TvDetail;
