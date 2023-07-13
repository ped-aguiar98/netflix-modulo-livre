import Genre from "@/pages/genre";
import { useEffect, useState } from "react";

export default function Filter({searchValue, gender}){

    const [differentId,setDifferentId] = useState([])
    const [filter, setFilter] = useState([])

    useEffect(() => {

        if (searchValue !== " ") {
            const filteredId = FilterId(gender)
            setDifferentId(filteredId)                    
        }
        else {setDifferentId([])}

    }, [searchValue, gender]);

    useEffect(() => {

        if(differentId != []){
            const filtered = filterMovies(differentId);
        console.log(filtered)
        setFilter(filtered)
        }
        
    },[differentId])


    const FilterId = (movies)=> {
        let array = []
        movies.forEach((genero) => {
            genero.forEach((item) => {
                const index = array.findIndex(movie => movie.id === item.id)
                if(index == -1){ array.push(item)}
                
            })
        })
        console.log(array)
        return array
    }
    
    const filterMovies = (movies) => {
        return movies.filter((movie) => {

            if(movie.title  || movie.name){
                const title = (movie.title || movie.name ).toLowerCase();
                return title.includes(searchValue);
            }

            return false
        });
    };

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