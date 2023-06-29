import useAuth from '@/hooks/useAuth'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from "react-hook-form"

function Login () {
    const [login, setLogin] = useState(false)
    const { signIn, signUp } = useAuth()

    //react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async({email, password}) => {
        if (login) {
            await signIn(email, password)
          } else {
            await signUp(email, password)
          }
      }


    return( 
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <Head>
                <title>Netflix</title>
                <link rel='icon' href='/netflix-icon.png'></link>
            </Head>
            <Image
                    src="/netflix-background.jpg"
                    fill={true}
                    className="-z-10 !hidden opacity-60 sm:!inline"
                    object-fit="cover"
                    alt=''
                />

            <img
                src="/netflix-name-logo.png"
                className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
                width={150}
                height={150}
                alt=''
            />

            <form onSubmit={handleSubmit(onSubmit)} 
            className="relative mt-24 space-y-8 rounded bg-black/75 py-14 px-6 md:mt-0 md:max-w-md md:px-14">
                <h1 className="text-3xl font-semibold">Entrar</h1>
                    <div className="space-y-4">
                        <label className="w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 bg-[#e2e8f0] rounded-md placeholder-[#6b7280] text-black outline-none focus:bg-[#6b7280]"
                                {...register('email', { required: true })}
                                />
                                {
                                errors.email && ( <p className="p-1 text-[13px] font-light  text-orange-500"> Informe um e-mail válido. </p>)
                                }
                        </label>
                        <label className="inline-block w-full">
                            <input
                                type="password"
                                placeholder="Senha"
                                className=" w-full p-2 bg-[#e2e8f0] rounded-md placeholder-[#6b7280] text-black outline-none focus:bg-[#6b7280]"
                                {...register('password', { required: true })}
                                />
                                {errors.password && ( <p className="p-1 text-[13px] font-light  text-orange-500">A senha deve ter entre 4 e 60 caracteres.</p>)
                                }
                        </label>
                    </div>

                <button className="w-full rounded bg-[#e50914] py-3 font-bold" onClick={() => setLogin(true)}> Entrar</button>

                <div className="text-[gray]"> Novo por aqui?
                    <button
                        type="submit"
                        className="text-white hover:underline"
                        onClick={() => setLogin(false)}
                    >Assine agora
                    </button>
                </div>
            </form>

        </div>
)}

export default Login