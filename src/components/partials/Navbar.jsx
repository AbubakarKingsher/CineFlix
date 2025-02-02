import React, { useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { IoClose, IoSearch, IoTv } from 'react-icons/io5'
import { Link } from 'react-router-dom'

function Navbar() {

    const [openAndClose, setOpenAndClose] = useState("hidden")

    return (
        <div className='w-full flex items-center justify-between py-7 px-5'>
            <Link to="/" className='logo flex items-center gap-2 cursor-pointer'>
                <IoTv color='#006eab' size={40} />
                <h2 className=' font-semibold text-xl'>CineFlix</h2>
            </Link>
            <HiMenu onClick={() => setOpenAndClose("flex")} className='md:hidden' color='white' size={30} cursor='pointer' />
            <div className={`bg-[#002C44] h-full w-56 fixed z-50 right-0 top-0 ${openAndClose} flex-col items-center p-5`}>
                <IoClose onClick={() => setOpenAndClose("hidden")} className='absolute top-1 right-1' color='white' cursor='pointer' size={25} />
                <Link to='/tranding' className='font-medium text-base  py-2 w-full text-center mb-2 mt-4'>Tranding</Link>
                <Link to='/popular' className='font-medium text-base  py-2 w-full text-center mb-2'>Popular</Link>
                <Link to='/movie' className='font-medium text-base  py-2 w-full text-center mb-2'>Movies</Link>
                <Link to='/tv' className='font-medium text-base  py-2 w-full text-center mb-2'>Tv Shows</Link>
                <Link to="/people" className='font-medium text-base  py-2 w-full text-center mb-2'>People</Link>
            </div>
            <ul className='md:flex gap-10 hidden'>
                <Link to='/tranding' className='font-medium text-base '>Tranding</Link>
                <Link to='/popular' className='font-medium text-base '>Popular</Link>
                <Link to='/movie' className='font-medium text-base '>Movies</Link>
                <Link to='/tv' className='font-medium text-base '>Tv Shows</Link>
                <Link to="/people" className='font-medium text-base '>People</Link>
            </ul>
        </div>
    )
}

export default Navbar