import React, { useEffect, useState } from 'react'
import { FaFire, FaSearch } from 'react-icons/fa'
import axios from '../../utils/axios'
import { IoIosClose, IoMdCloseCircle } from 'react-icons/io'
import { MdImageNotSupported } from 'react-icons/md'
import { Link } from 'react-router-dom'

function Search() {

    const [searchResults, setSearchResults] = useState([])
    const [query, setQuery] = useState('')

    const searchApi = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`)
            setSearchResults(data.results)
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    useEffect(() => {
        searchApi()
    }, [query]);


    return (
        <div className='relative flex items-center justify-center '>
            <div className='md:w-full w-72 h-20 flex items-center justify-center'>
                <div className=' bg-[#003959] rounded-full w-96 flex px-3 items-center'>
                    <FaSearch />
                    <input onChange={(e) => setQuery(e.target.value)} value={query} type='text' className='w-full h-full px-4 py-2 rounded-md  focus:outline-none' placeholder='Search' />
                    {query && query.length > 0 && <IoMdCloseCircle onClick={() => setQuery("")} size={18} cursor='pointer' />}
                </div>
            </div>
            {searchResults.length > 0 && <div className='search h-40 p-1 bg-[#003959] absolute z-50 top-36 rounded md:w-96 w-72 left-[50%] -translate-x-[50%] -translate-y-[50%] overflow-auto'>

                {searchResults.map((item, idx) => (
                    <Link to={`/${item.media_type}/details/${item.id}`} key={idx} className='p-1 w-full flex gap-3 cursor-pointer mb-1 rounded bg-[#001E2F]'>
                        <img className='h-28 shrink-0 object-cover w-30 rounded bg-blue-100' src={item.poster_path ? ("https://image.tmdb.org/t/p/original/" + item.poster_path || data.backdrop_path) : item.profile_path ? "https://image.tmdb.org/t/p/original/" + item.profile_path : "https://photosnow.net/wp-content/uploads/2024/04/no-dp-mood-off_9.jpg"} />
                        <div className='mt-2'>
                            <h2 className='mb-1'>{item.name || item.title || item.original_name || item.original_title}</h2>
                            <p className='text-[12px] md:flex mb-2 hidden items-center gap-1'><FaFire color='red' />{Math.floor(item.popularity) + "k"}</p>
                            <p className='text-[12px] hidden md:block w-[80%]'>{item.overview && item.overview.slice(0, 40)} <span className='text-blue-300 text-[10px] mt-1'>more...</span></p>
                        </div>
                    </Link>
                ))}

            </div>}
        </div>
    )
}

export default Search