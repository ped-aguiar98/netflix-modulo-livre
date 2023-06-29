import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { baseUrl } from '@/constants/movie'
import { InformationCircleIcon, PlayIcon } from '@heroicons/react/20/solid';


function Banner(netflixOriginals) {
    const [movie, setMovie] = useState(null)


    useEffect(() => {
        setMovie(netflixOriginals.netflixOriginals[Math.floor(Math.random() * netflixOriginals.netflixOriginals.length)])
    }, [netflixOriginals])


    return (
        <div>
            <div>
                <div className='abolute top-0 left-0  h-[95vh] w-full'>
                    {movie ?<Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                    alt='movie banner'
                    fill
                    style={{ objectFit: 'cover'}}/> : <div className='bg-black'></div>}
                </div>
                <div className='absolute top-44 space-y-2 md:space-y-4 lg:h-[65vh]'>
                    <div className='space-y-2 md:space-y-4'>
                        <h1 className=' font-bold text-2xl lg:text-7xl md:text-4xl'>{movie ? movie?.title || movie?.name : 'loading'}</h1>
                        <p className=' max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl'>{movie ? movie?.overview : 'loading'}</p>
                    </div>
                    <div className='flex space-x-3'>
                        <button className='bannerButton bg-white text-black'><PlayIcon className='text-black h-4 w-4 md:h-7 md:w-7'/>Assistir</button>
                        <button className='bannerButton bg-[gray]/70'><InformationCircleIcon className='h-5 w-5 md:h-8 md:w-8'/>Mais informações</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner