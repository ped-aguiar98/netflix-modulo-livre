import { useEffect, useState } from "react";
import fetchData from "@/utils/fetchdata";

export default function Search(){
    const [searchInput, setSearchInput] = useState('');
    const [movies,setMovies] = useState([])

    const [netflixOriginals, setNetflixOriginals] = useState([]);
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [documentaries,setDocumentaries] = useState([])
    const [horrorMovies, setHorrorMovies] = useState([])
    const [romanceMovies, setRomanceMovies] = useState([])
    const [topRated, setTopRated] = useState([])
    const [trendingNow,setTrendingNow] = useState([])
    

    useEffect(() => {
        fetchData()
            .then((result) => {
                //console.log(result)
                setMovies(result)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    //console.log(trendingNow)

    const searchItems = (searchValue) => {

        setSearchInput(searchValue);
    
        if (searchValue) {
            const filteredOriginalsNetflix = filterMovies(movies.netflixOriginals, searchValue);
            const filteredActionsMovies = filterMovies(movies.actionMovies, searchValue);
            const filteredComedyMovies = filterMovies(movies.comedyMovies, searchValue);
            const filteredDocumentaries = filterMovies(movies.documentaries,searchValue);
            const filteredHorrorMovies = filterMovies(movies.horrorMovies, searchValue);
            const filteredRomanceMovies = filterMovies(movies.romanceMovies, searchValue);
            const filteredTopRated = filterMovies(movies.topRated, searchValue);
            const filteredTrendingNow = filterMovies(movies.trendingNow, searchValue);

            setNetflixOriginals(filteredOriginalsNetflix)
            setActionMovies(filteredActionsMovies)
            setComedyMovies(filteredComedyMovies)
            setDocumentaries(filteredDocumentaries)
            setHorrorMovies(filteredHorrorMovies)
            setRomanceMovies(filteredRomanceMovies)
            setTopRated(filteredTopRated)
            setTrendingNow(filteredTrendingNow)
        }
        else {
            setNetflixOriginals([])
            setActionMovies([])
            setComedyMovies([])
            setDocumentaries([])
            setHorrorMovies([])
            setRomanceMovies([])
            setTopRated([])
            setTrendingNow([])
        }
      };

    const filterMovies = (movies, searchValue) => {
        return movies.filter((movie) => {

            if(movie.title){
                const title = movie.title.toLowerCase();
                return title.includes(searchValue.toLowerCase());
            }
            return 
        });
    };
    
    return(
        <div>
            <input
                onChange={(e) => searchItems(e.target.value)} 
                type='search'
                name='busca'
                placeholder=' Título, gêneros' 
                className="bg-transparent w-5 h-9 bg-[url('/search.svg')] bg-contain bg-no-repeat bg-right border-none placeholder-transparent focus:w-[200px] focus:bg-white focus:placeholder-white focus:border-solid focus:outline-none transition-all duration-1000 focus:border-white"
            />
            {/*<MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline"/>*/}

            
            <ul className="w-full">
                {/*searchInput.length > 1 ? (
                    netflixOriginals.map((movie) => {
                        {console.log(movie)}
                        return(
                           <div className=" bg-red-400" >
                            <img src={`https://image.tmdb.org/t/p/w500${
                                movie.backdrop_path || movie.poster_path
                                }`}
                                alt=""/>
                            <h1>{movie.title}</h1>
                        </div> 
                        )
                    })
                ): 
                (
                    <div></div>
                )*/}
            </ul>
        </div>
        
    )

    }
