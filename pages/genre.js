import Header from "@/components/Header";
import fetchData from "@/utils/fetchdata";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";


export default function Genre(){
    const router = useRouter();
    const { genre } = router.query;
    
    const [movies,setMovies] = useState([])

    useEffect(() => {
        fetchData()
            .then((result) => {
                console.log(result)
                switch(genre){
                    case 'filmes': 
                        setMovies(result.movies);
                        break;
                    case 'tv': setMovies(result.tv)
                        break;
                    case 'trending': setMovies(result.trendingNow)
                        break;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [genre])

    console.log(movies)
    
    return (
        <div>
            <div className="h-[50px]">
               <Head>
                <title>Netflix</title>
                <link rel='icon' href='/netflix-icon.png'></link>
                </Head>
                <Header/> 
            </div>
            
            <div className="m-4 grid lg:grid-cols-5 gap-x-4 gap-y-4 sm:grid-cols-4 grid-cols-2">
               {   
            movies.map((movie) => {
                return(
                    <div className="">
                         <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                                className="grid row-start-6 items-center"
                                alt=''/>
                    </div>
                   
                )
            })
            } 
            </div>
            
            
        </div>
    )
}