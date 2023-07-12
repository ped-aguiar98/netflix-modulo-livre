import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();


    const searchInput = (value) => {

            setSearchValue(value)
            router.push({
                pathname: router.pathname,
                query: { search: value },
            })
    }

    return (
        <div>
            <form>
                <input
                    onChange={(e) => searchInput(e.target.value)}
                    type='search'
                    name='busca'
                    placeholder=' Título, gêneros'
                    className="bg-transparent w-5 h-9 bg-[url('/search.svg')] bg-contain bg-no-repeat bg-right border-none placeholder-transparent focus:w-[200px] focus:bg-black focus:placeholder-white focus:border-solid focus:outline-none transition-all duration-1000 focus:border-white"
                />
            </form>
        </div>

    )
}
