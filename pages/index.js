import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Row from '../components/Row'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/netflix-icon.png'></link>
      </Head>

      <Header/>
      <main >
        <Banner/>
        <section>
          <Row/>
        </section>
      </main>
      
    </div>
  )
}
