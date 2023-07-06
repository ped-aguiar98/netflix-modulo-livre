import requests from '@/utils/requests';

const fetchData = async () => {
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
  ]);

  return {
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
  };
};

export default fetchData;
