import React, { useEffect, useState } from 'react'
import MovieCard from './MoiveCard'
import axios from '../../utils/axios'
import DropDown from './DropDown'

function Cards() {

    const [data, setData] = useState([])
    const [category, setCategory] = useState("all")

    const filterApi = async () => {
        try {
            const { data } = await axios.get(`trending/${category}/day`)
            setData(data.results);

        } catch (error) {
            console.log("Error: " + error);

        }
    }

    useEffect(() => {
        filterApi()
    }, [category]);


    return (
        <div className='p-5 w-full h-fit'>
            <DropDown options={["All", "Movie", "Tv"]} func={[category, setCategory]} />
            <div className='card h-full w-full flex items-center gap-5 overflow-auto'>
                {data.map((item, idx) => (
                    <MovieCard data={item} key={idx} />
                ))}
            </div>
        </div>
    )
}

export default Cards