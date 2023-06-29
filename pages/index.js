import Image from 'next/image'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Row from '../components/Row'
import requests from '@/utils/requests'

const inter = Inter({ subsets: ['latin'] })

export default function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow
 }) {
  console.log(actionMovies)
  console.log(comedyMovies)
  console.log(documentaries)
  console.log(horrorMovies)
  console.log(romanceMovies)
  console.log(topRated)
  console.log(trendingNow)
  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/netflix-icon.png'></link>
      </Head>

      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16 overflow-x-hidden'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className=''>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List Component */}
          {/* {list.length > 0 && <Row title="My List" movies={list} />} */}

          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>

    </div>
  )
}

export const getServerSideProps = async () => {
  // const products = await getProducts(payments, {
  //   includePrices: true,
  //   activeOnly: true,
  // })
  //   .then((res) => res)
  //   .catch((error) => console.log(error.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals, { timeout: 20000 }).then((res) => res.json()),
    fetch(requests.fetchTrending, { timeout: 20000 }).then((res) => res.json()),
    fetch(requests.fetchTopRated, { timeout: 20000 }).then((res) => res.json()),
    fetch(requests.fetchActionMovies, { timeout: 20000 }).then((res) => res.json()),
    fetch(requests.fetchComedyMovies, { timeout: 20000 }).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies, { timeout: 20000 }).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies, { timeout: 20000 }).then((res) => res.json()),
    fetch(requests.fetchDocumentaries, { timeout: 20000 }).then((res) => res.json()),
  ])

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      // products,
    },
  }
}
