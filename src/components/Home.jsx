import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import Row from './Row'
import requests from '../helpers/request'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarge
      />
      <Row
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
      />
       <Row
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
       <Row
        title="Romantic Movies"
        fetchUrl={requests.fetchRomanticMovies}
      />
       <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
      
    </div>
  )
}

export default Home