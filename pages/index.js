import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Row from '../components/Row'
import requests from '@/utils/requests'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Filter from '@/components/Filter'
import Plans from '@/components/Plans'
import payments from '@/lib/stripe'
import { getProducts } from '@stripe/firestore-stripe-payments'
import useSubscription from '@/hooks/useSubscription'
import useAuth from '@/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export default function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  movies,
  tv,
  products
}) {

  const { user } = useAuth()
  const subcription = useSubscription(user)
  const router = useRouter()
  const [query, setQuery] = useState(null)

  useEffect(() => {
    if (subcription) {
      const value = router.query
      if (value.search && value.search != '') { setQuery(value.search) }
      else{
        setQuery('')
      }
    }
  }, [router.query])

  if (subcription === null) { return null }
  if (!subcription){ return <Plans products={products} />}

  return (
    <div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/netflix-icon.png'></link>
      </Head>

      <Header />

      {query != '' && query != null ? (
        <section className='mt-[100px]'>
          <Filter searchValue={query} gender={[movies,tv,netflixOriginals,actionMovies,comedyMovies,documentaries,horrorMovies,romanceMovies,topRated,trendingNow]} />
        </section>
      ) :
        (
          <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16 overflow-x-hidden'>
            <Banner netflixOriginals={netflixOriginals} />
            <section className='md:space-y-24'>
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
        )
      }
    </div>
  )
}

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    movies,
    tv
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals, { timeout: 10000 }).then((res) => res.json()),
    fetch(requests.fetchTrending, { timeout: 10000 }).then((res) => res.json()),
    fetch(requests.fetchTopRated, { timeout: 10000 }).then((res) => res.json()),
    fetch(requests.fetchActionMovies, { timeout: 10000 }).then((res) => res.json()),
    fetch(requests.fetchComedyMovies, { timeout: 10000 }).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies, { timeout: 10000 }).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies, { timeout: 10000 }).then((res) => res.json()),
    fetch(requests.fetchDocumentaries, { timeout: 10000 }).then((res) => res.json()),
    fetch(requests.fetchMovies, { timeout: 10000 }).then((res) => res.json()),
    fetch(requests.fetchTv, { timeout: 10000 }).then((res) => res.json()),
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
      movies: movies.results,
      tv: tv.results,
      products,
    },
  }
}
