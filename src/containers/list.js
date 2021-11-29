import axios from "axios";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { Card, Player } from "../components";
import Slider from "react-slick";
import movieTrailer from "movie-trailer";
import "./list.css";
const baseURL = "https://image.tmdb.org/t/p/original/";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      <img src="images/icons/chevron-right.png" />
    </button>
  );
}
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button className={className} onClick={onClick}>
      <img src="images/icons/chevron-right.png" />
    </button>
  );
}
export default function ListContainer({ title, fetchUrl, isLargeRow }) {
  const [detailMovie, setDetailMovie] = useState();
  const [trailerUrl, setTrailerUrl] = useState("");
  const [movies, setMovies] = useState([]);
  const settings = {
    lazyLoad: "ondemand",
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(
        "https://api.themoviedb.org/3" + fetchUrl
      );
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  const handleClick = (item) => {
    setDetailMovie(item);
    movieTrailer(item.name || item.title || item.original_name || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error) => {
        setTrailerUrl("Hs-1_HNALhw");
      });
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        <Slider {...settings}>
          {movies.map((item) => (
            <Card.Item key={item.id} item={item}>
              <div className="parent" onClick={() => handleClick(item)}>
                <img
                  src={`${baseURL}${
                    isLargeRow ? item.poster_path : item.backdrop_path
                  }`}
                  alt={item.name || item.title || item.original_name}
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                />
                <div className="meta">
                  <h2>{item.name || item.title || item.original_name}</h2>
                  <p>{item.overview}</p>
                </div>
              </div>
            </Card.Item>
          ))}
        </Slider>
        {detailMovie && (
          <Card.Feature detailMovie={detailMovie} title={title}>
            <Player>
              <Player.Button />
              {trailerUrl && <Player.Video src={trailerUrl} />}
            </Player>
          </Card.Feature>
        )}
        {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>} */}
      </div>
    </div>
  );
}
