import { BellIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Search from './Search.js'

export default function Header(){
    //Adiciona um estado a barra de rolagem
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        //Funçao para barra de rolagem
        const handleScroll = () => {
            //Se a coordenada da barra for maior que 0
          if (window.scrollY > 0) {
            //Estado da rolagem é verdadeiro
            setIsScrolled(true)
          } else {
            //Estado da rolagem é falso
            setIsScrolled(false)
          }
        }
        //Adicionando um evento a barra de rolagem
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
          }
    }, [])    


    return(
        //Se a coordenada da barra de rolagem for diferente de 0 o bg ficará preto
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className="flex items-center lg:pl-11 space-x-2 md:space-x-10"> 
                <Image
                    src="/netflix-name-logo.png"
                    width={100}
                    height={100}
                    className="cursor-pointer object-contain"
                    priority={true}
                    style={{ width: "auto", height: "auto" }}
                    alt=''
                />


                <ul className="hidden md:flex md:flex-row">
                    <Link href="/"><li className="headerLink  font-semibold text-white hover:text-white">Início</li></Link>
                    <Link href="/genre?genre=filmes"><li className="headerLink">Filmes</li></Link>
                    <Link href="/genre?genre=tv"><li className="headerLink">Séries</li></Link>
                    <Link href="/genre?genre=trending"><li className="headerLink">Popular</li></Link>
                    <li className="headerLink">Minha Lista</li>
                </ul>
            </div>
            

            <div className="flex items-center space-x-4 text-sm font-light">
                <Search/>
                {/*<MagnifyingGlassIcon className="hidden h-6 w-6 sm:inline"/>*/}
                <p className="hidden lg:inline">Kids</p>
                <BellIcon className="h-6 w-6" />
                <Link href={"/account"}>
                    <img
                        src="/profile.png"
                        alt=""
                        className="cursor-pointer rounded"
                    />
                </Link>
            </div>
        </header>
    )
}