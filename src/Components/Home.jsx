import {useState, useEffect} from 'react'
import axios from 'axios'
import bgImg from '../assets/avatar.jpg'
import {BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
import '../Styles/Home.scss'

const apiKey = '2a78562947ecb94304c4f6d2981b3651'
const url = 'https://api.themoviedb.org/3'
const imgUrl = 'https://image.tmdb.org/t/p/original'
const upcoming = 'upcoming'
const popular = 'popular'
const nowPlaying = 'now_playing'
const topRated = 'top_rated'

const Card = ({img}) => (
  <img className='card' src={img} alt="cover" />
)

const Row =  ({title,arr = [{
  img: "https://www.pixelstalk.net/wp-content/uploads/images6/Avengers-Endgame-Desktop-Wallpaper.jpg"
}]}) =>(
  
    <div className='row'>
      <h3>{title}</h3>
      <div>
        {
          arr.map((item, index)=>(
            <Card key={index} img={`${imgUrl
            }/${item.poster_path}`}/>
          ))
        }
      </div>
    </div>
  )

const Home = () => {

  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [nowPlayingMovies, setNowPlayingMovies] = useState([])

    useEffect(() => {
    
    const fetchUpcoming = async() => {
    const {data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
    setUpcomingMovies(results)
    }

    const fetchNowPlaying = async() => {
    const {data: {results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
    setNowPlayingMovies(results)
    }

    const fetchPopular = async() => {
    const {data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
    setPopularMovies(results)
    }

    const fetchTopRated = async() => {
    const {data: {results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
    setTopRatedMovies(results)
    }

    fetchUpcoming()
    fetchNowPlaying()
    fetchTopRated()
    fetchPopular()
  }, [])


  return (
     <section className="home">
      <div className="banner" style={{
      backgroundImage: `url(${bgImg})`,
      height:'650px',
      }}>
        {popularMovies[1] && <h1>{popularMovies[1].original_title}</h1>}
        {popularMovies[1] && <p>{popularMovies[1].overview}</p>}
        <div>
            <button><BiPlay />Play</button>
            <button>My List<AiOutlinePlus /></button>
        </div>
      </div>

      <Row title={'Upcoming Movies'} arr={upcomingMovies} />
      <Row title={'Polular Shows'} arr={popularMovies} />
      <Row title={'Now Playing'} arr={nowPlayingMovies} />
      <Row title={'Top Rated'} arr={topRatedMovies} />
    </section>
  )
}

export default Home