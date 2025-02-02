import React from 'react'
import { IoClose } from 'react-icons/io5'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'


function Trailer({ show }) {

    const [showTrailer, setShowTrailer] = show

    const { pathname } = useLocation()

    const category = pathname.includes("movie") ? "movie" : "tv";

    const { info } = useSelector(state => state[category])

    return (
        <div
            className={`fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex items-center justify-center ${showTrailer}`}
        >
            <div className="relative rounded-lg p-4 w-[90%] max-w-[600px]">
                <button
                    className="absolute top-2 right-2 text-white text-2xl"
                    onClick={() => setShowTrailer("hidden")}
                >
                    <IoClose size={30} cursor="pointer" />
                </button>
                <div className="w-full aspect-video">
                    {info.trailer ? (
                        showTrailer === "block" ? <ReactPlayer
                            width="100%"
                            height="100%"
                            controls
                            muted
                            url={`https://www.youtube.com/watch?v=${info.trailer.key}`}
                        /> : null
                    ) : (
                        <img className='h-full w-full'
                            src="/assets/404.gif"
                            alt="Video Unavailable"
                            style={{ width: "100%", height: "auto" }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Trailer