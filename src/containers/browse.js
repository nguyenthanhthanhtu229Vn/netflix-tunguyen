import { SelectProfileContainer } from "./profiles";
import { FirebaseContext } from "../context/firebase";
import { useContext, useEffect, useState } from "react";
import { Header, Loading, Card, Player } from "../components";
import FooterContainer from "./footer";
import Slider from "react-slick";
import ListContainer from "./list";
import * as ROUTES from "../constants/routes";
import Fuse from "fuse.js";
import request from "../axios/request";
import axios from "axios";
export function BrowseContainer({ slides }) {
  const [category, setCategory] = useState("series");
  const [searchTerm, setSearchTerm] = useState("");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [slideRow, setSlideRows] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(() => {
    const featchData = async () => {
      const response = await axios.get("");
      setSlideRows(slides[category]);
    };
    featchData();
  }, [slides, category]);

  useEffect(() => {
    console.log(slideRow);
    const fuse = new Fuse(slideRow, {
      keys: ["data.description", "data.title", "data.genre"],
    });
    const results = fuse.search(searchTerm).map(({ item }) => item);
    if (slideRow.length > 0 && searchTerm.length > 3 && results.length > 0) {
      setSlideRows(results);
    } else {
      setSlideRows(slides[category]);
    }
  }, [searchTerm]);
  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const [movies, setMovies] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original/";
  const settings = {
    arrows: false,
    autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3" + request.fetchNetflixOriginals
      );
      setMovies(response.data.results);
      return response;
    };
    fetchData();
  });
  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}
      <Header.Frame2>
        <Header.Group>
          <Header.Logo
            to={ROUTES.HOME}
            src="/images/icons/Netflix.svg"
            alt="Netflix"
          />
          <Header.TextLink
            active={category === "series" ? "true" : "false"}
            onClick={() => setCategory("series")}
          >
            Series
          </Header.TextLink>
          <Header.TextLink
            active={category === "films" ? "true" : "false"}
            onClick={() => setCategory("films")}
          >
            Films
          </Header.TextLink>
        </Header.Group>
        <Header.Group>
          <Header.Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <Header.Profile>
            <Header.Picture src={user.photoURL}></Header.Picture>
            <Header.Dropdown>
              <Header.Group>
                <Header.Picture src={user.photoURL}></Header.Picture>
                <Header.TextLink>{user.displayName}</Header.TextLink>
              </Header.Group>
              <Header.Group>
                <Header.TextLink onClick={() => firebase.auth().signOut()}>
                  Sign out
                </Header.TextLink>
              </Header.Group>
            </Header.Dropdown>
          </Header.Profile>
        </Header.Group>
      </Header.Frame2>
      <Slider {...settings}>
        {movies.map((item) => (
          <Header
            src={`${baseURL}${item.backdrop_path}`}
            dontShowOnSmallViewPort
          >
            <Header.Feature>
              <Header.FeatureCallOut>
                {item.name || item.title || item.original_name}
              </Header.FeatureCallOut>
              <Header.Text>{item.overview}</Header.Text>
              <Header.PlayButton>Play</Header.PlayButton>
            </Header.Feature>
          </Header>
        ))}
      </Slider>
      <Card.Group>
        <Card>
          <ListContainer
            isLargeRow={true}
            title={"Trending Now"}
            fetchUrl={request.fetchTrending}
          ></ListContainer>
          <ListContainer
            title={"Top Rated"}
            fetchUrl={request.fetchTopRated}
          ></ListContainer>
          <ListContainer
            title={"Action Movies"}
            fetchUrl={request.fetchActionMovies}
          ></ListContainer>
          <ListContainer
            title={"Comedy Movies"}
            fetchUrl={request.fetchComedyMovies}
          ></ListContainer>
          <ListContainer
            title={"Horror Movies"}
            fetchUrl={request.fetchHorrorMovies}
          ></ListContainer>
          <ListContainer
            title={"Romance Movies"}
            fetchUrl={request.fetchRomanceMovies}
          ></ListContainer>
          <ListContainer
            title={"Documentaries"}
            fetchUrl={request.fetchDocumentaries}
          ></ListContainer>
        </Card>
      </Card.Group>
      <FooterContainer />
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}
