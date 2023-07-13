import Filter from "@/components/Filter";
import Header from "@/components/Header";
import useAuth from "@/hooks/useAuth";
import useList from "@/hooks/useList";
import fetchData from "@/utils/fetchdata";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function MyList() {
    const {user} = useAuth()
    const list = useList(user?.uid)

    const router = useRouter();
    const query = router.query;
    const searchValue = query.search

    const [movie,setMovies] = useState([])
    const [search, setSearch] = useState('')


    useEffect(() => {
        fetchData()
            .then((result) => {
                setSearch('')
                if (searchValue && searchValue != '') {
                    setMovies(result)
                    setSearch(searchValue)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [query])

    return (
        <div>
            <Head>
                <title>Netflix</title>
                <link rel='icon' href='/netflix-icon.png'></link>
            </Head>
            <Header/>

            <main className="mt-16">
            {search != '' ? (
                <section className='mt-[100px]'>
                    <Filter searchValue={search} gender={movie.movies} />
                    <Filter searchValue={search} gender={movie.tv} />
                    <Filter searchValue={search} gender={movie.netflixOriginals} />
                </section>
            ) :
                (
                    <section>
                        <h1 className="m-5 px-3 text-2xl font-bold md:text-4xl lg:text-3xl ">Minha Lista</h1>
    
                        <div className="m-4 grid lg:grid-cols-5 gap-x-4 gap-y-4 sm:grid-cols-4 grid-cols-2">
                            {
                                list.map((movie) => {
                                    return (
                                        <div key={movie.key} className="">
                                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                                                className="grid row-start-6 items-center"
                                                alt='' />
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </section>

                )
            }
            </main>

        </div>
    )
}