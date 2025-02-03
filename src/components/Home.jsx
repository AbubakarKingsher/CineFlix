import React, { useEffect, useState } from 'react'
import Navbar from './partials/Navbar'
import axios from '../utils/axios';
import Card from "./partials/Card";
import { RiMovie2Fill } from 'react-icons/ri';
import { FaBullhorn, FaPlay } from 'react-icons/fa';
import Search from './partials/Search';
import Cards from './partials/Cards';
import Loading from './partials/Loading';
import { Link } from 'react-router-dom';


function Home() {

    const [randomMovie, setRandomMovie] = useState(null)
    const [data, setData] = useState([])
    const [more, setMore] = useState(false)


    const callApi = async () => {
        try {
            const { data } = await axios.get("trending/all/day?page=2")
            let randomData = data.results[(Math.random() * data.results.length).toFixed()]
            setRandomMovie(randomData)
            setData(data.results)
        } catch (error) {
            console.log("Error: " + error);

        }
    }


    useEffect(() => {
        callApi()
    }, []);

    return (
        <>
            {randomMovie ? <div className='h-full w-full bg-[#001e2f] text-white'>
                {randomMovie ?
                    <div
                        className="hero h-[80vh] w-full bg-center bg-cover bg-no-repeat"
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 100%), url(${"https://image.tmdb.org/t/p/original/" + randomMovie.backdrop_path || randomMovie.profile_path}`,
                        }}
                    >
                        <Navbar />
                        <div className='pl-10 mt-24'>
                            <h1 className='inline-block text-4xl font-bold mb-3'>
                                {randomMovie.title || randomMovie.name}
                            </h1>
                            <p className=' text-sm w-[70%]'>{more ? randomMovie.overview : randomMovie.overview.slice(0, 200)} {randomMovie.overview.length > 200 && <span onClick={() => setMore(!more)} className='text-blue-500 cursor-pointer'>{more ? "less" : "more..."}</span>}</p>
                            <div className='mt-3 flex gap-5'>
                                <div className='flex items-center gap-2 text-sm'>
                                    <FaBullhorn color='yellow' size={15} />
                                    <h2>{randomMovie.first_air_date || "No Information"}</h2>
                                </div>
                                <div className='flex items-center gap-1 text-sm'>
                                    <RiMovie2Fill className='mb-1' color='yellow' size={15} />
                                    <h2 className='uppercase'>{randomMovie.media_type || "No Information"}</h2>
                                </div>
                            </div>
                            <Link to={`/${randomMovie.media_type}/details/${randomMovie.id}`} className='mt-5 h-11 inline-block cursor-pointer py-2 px-5 bg-[#002C44] rounded-full border-white border-2 '><FaPlay className='inline-block mr-2' color='white' /> Watch trailer</Link>
                        </div>
                    </div> : null}
                <Search />
                <Cards />
                <div className="flex items-center justify-center gap-5 flex-wrap mt-10 overflow-y-auto bg-[#001E2F] px-2">
                    {data.length === 0 ? (
                        <Loading />
                    ) : (
                        data.map((item, idx) => <Card data={item} key={idx} />)
                    )}
                </div>
            </div> : <Loading />}</>
    )
}

export default Home