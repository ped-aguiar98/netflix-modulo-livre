import useAuth from "@/hooks/useAuth";
import { CheckIcon } from "@heroicons/react/outline";
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image'
import Table from "./Table";
import { useEffect, useState } from "react";
import { loadCheckout } from '../lib/stripe'
import Loader from "./Loader";


export default function Plans(props) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(props.products)
    }, [props])

    const { logout, user } = useAuth()
    const [selectedPlan, setSelectedPlan] = useState(products[2])
    const [isBillingLoading, setBillingLoading] = useState(false)

    const subscribeToPlan = () => {
        if (!user) return
        
        loadCheckout(selectedPlan.prices[0].id)
        setBillingLoading(true)
    }

    return (
        <div className="bg-white text-black">
            <Head>
                <title>Netflix</title>
                <link rel='icon' href='/netflix-icon.png'></link>
            </Head>

            <header className="border-b border-gray h-10 bg-white">
                <Link href="/">
                    <Image
                        src="/netflix-name-logo.png"
                        width={100}
                        height={100}
                        className="cursor-pointer object-contain"
                        priority={true}
                        style={{ width: "auto", height: "auto" }}
                        alt=''
                    />
                </Link>
                <button
                    className="text-lg font-medium hover:underline"
                    onClick={logout}
                >Sair</button>
            </header>

            <main className="mx-auto max-w-5xl px-5 pt-[3rem] pb-2 transition-all md:px-10">
                <h2 className="mb-3 text-3xl font-medium">Escolha o plano para você</h2>
                <ul>
                    <li className="flex items-center gap-x-2 text-sm">
                        <CheckIcon className="h-5 w-7 text-[#E50914]" />
                        Assista o quanto quiser.
                    </li>
                    <li className="flex items-center gap-x-2 text-sm">
                        <CheckIcon className="h-5 w-7 text-[#E50914]" />
                        Recomendações especiais para você.
                    </li>
                    <li className="flex items-center gap-x-2 text-sm">
                        <CheckIcon className="h-5 w-7 text-[#E50914]" />
                        Altere ou cancele seu plano quando quiser.
                    </li>
                </ul>

                <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex w-full items-center justify-center self-end md:w-3/5">

                        {products.map((product) => (
                            <div key={product.id}
                                className={`planBox ${selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'}`}
                                onClick={() => setSelectedPlan(product)}
                            >
                                {product.name}
                            </div>
                        ))
                        }

                    </div>
                    <Table products={products} selectedPlan={selectedPlan} />
                    <button
                        disabled={!selectedPlan || isBillingLoading}
                        className={`cursor-pointer mx-auto w-11/12 rounded bg-[#E50914] py-3 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${isBillingLoading && 'opacity-60'
                            }`}
                        onClick={subscribeToPlan}
                    >
                        {isBillingLoading ? (
                            <Loader color="dark:fill-gray-500" />
                        ) : (
                            'Inscreva-se'
                        )}
                    </button>
                </div>
            </main>

        </div>
    )
}