import { useEffect, useState } from "react";

export default function Filter({searchValue, gender}){

    const [filter, setFilter] = useState([])

    useEffect(() => {

        if (searchValue !== " ") {
            const filtered = filterMovies(gender);
            setFilter(filtered)
        }
        else {setFilter([])}

    }, [searchValue, gender]);

    
    const filterMovies = (movies) => {
        return movies.filter((movie) => {

            if(movie.title  || movie.name){
                const title = (movie.title || movie.name ).toLowerCase();
                return title.includes(searchValue);
            }

            return false
        });
    };

    //console.log(gender)
    //console.log(searchValue)
    //console.log(filter)

    return (
        <div className="m-4 grid lg:grid-cols-5 gap-x-2 gap-y-12 sm:grid-cols-4 grid-cols-2">
            { filter.map((movie) => {
                    return(
                         <div key={movie.id} className="" >
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                                alt=""
                                className="grid row-start-6 items-center"
                            />
                        </div> 
                        )
                    }
                  ) 
            }
        </div>
    )
}