import React, { useEffect, useState } from "react";
import { NavComponent } from "../../navigation/navComponent";
import { HomePageContent } from "./homePageContent";
import { MovieSearchPage } from "../movieSearchPage/movieSearchPage";
import { FooterComponent } from "../../footerComponent/footerComponent";

export const HomePage = () => {
  const [appBg, setAppBg] = useState(null);
  const [appBgMovieGenre, setAppBgMovieGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [selectedSearchMovieName, setSelectedSearchMovieName] = useState("");
  const [bgImg, setBgImg] = useState("");

  useEffect(() => {
    fetchNowPlayingMovieData();
  }, []);

  const fetchNowPlayingMovieData = async () => {
    setLoadingText("Loading...");
    try {
      setLoadingText("Connecting to Server...");
      const response = await fetch(
        process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL
      );
      const jsonData = await response.json();
      setLoadingText("Fetching...");
      await fetchBgMovieGenre(jsonData["data"]["results"][0]["genre_ids"]);
      setAppBg(jsonData["data"]["results"][0]);
      setLoading(false);
      console.log(jsonData["data"]["results"][0]);
    } catch (error) {
      setLoadingText("Error on connecting to server...");
      console.log("error fetching data: ", error);
      setLoading(false);
    }
  };

  const fetchBgMovieGenre = async (genre_id) => {
    const response = await fetch(
      process.env.REACT_APP_API_SERVICE_GET_MOVIE_GENRE_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie_genre: genre_id }),
      }
    );
    if (response.ok) {
      const genreBg = await response.json();
      setAppBgMovieGenre(genreBg);
    }
  };

  const handleMovieSelection = (movie) => {
    console.log(movie);
    setSelectedSearchMovieName(movie);
    console.log(selectedSearchMovieName);

  };

  const handleMovieBg = (moviePoster) => {
    console.log(moviePoster);
    setBgImg(moviePoster);
  };

  const imageUrlStyle = {
    "--bg-image":
      bgImg === ""
        ? (appBg && appBg.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${appBg.backdrop_path})`
            : "")
        : `url(https://image.tmdb.org/t/p/original${bgImg})`,
  };
  

  return (
    <div className="Home w-full h-full">
      {loading && (
        <div className="loader z-[100000000]">
          <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p className="m-[0.5rem] tracking-[1.5px] font-bold">
              {loadingText}
            </p>
          </div>
        </div>
      )}
      <div
        className="bg w-full h-screen bg-fixed bg-no-repeat bg-center bg-cover fixed z-[-15]"
        style={imageUrlStyle}
      ></div>
      <div className="main-container m-auto">
        <NavComponent onMovieSelect={handleMovieSelection}></NavComponent>
        <div className="main-page-content w-[90%] h-[100vh] my-28 mx-auto">
          {selectedSearchMovieName === "" ? (
            <HomePageContent
              appBg={appBg}
              appBgMovieGenre={appBgMovieGenre}
              titleCardMovie={handleMovieSelection}
            />
          ) : (
            <MovieSearchPage
              key={selectedSearchMovieName}
              onMoviePoster={handleMovieBg}
              movie_name={selectedSearchMovieName}
            />
          )}

        </div>
      </div>

    </div>
  );
};
