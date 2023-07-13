/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { NavComponent } from "../../navigation/navComponent";
import { HomePageContent } from "./homePageContent";
import { MovieSearchPage } from "../movieSearchPage/movieSearchPage";
import config from '../../../config/config'

export const HomePage = () => {
  const [appBg, setAppBg] = useState(null);
  const [appBgMovieGenre, setAppBgMovieGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("");
  const [selectedSearchMovieName, setSelectedSearchMovieName] = useState("");
  const [bgImg, setBgImg] = useState("");
  const [theme, setTheme] = useState("");


  const fetchNowPlayingMovieData = async () => {
    setLoadingText("Loading...");
    try {
      setLoadingText("Connecting to Server...");
      const response = await fetch(
        config.REACT_APP_API_SERVICE_GET_POPULAR_MOVIE_URL
      );
      setLoadingText("Initializing...");
      const jsonData = await response.json();
      console.log(jsonData)
      setLoadingText("Fetching...");
      await fetchBgMovieGenre(jsonData["results"][0]["genre_ids"]);
      setAppBg(jsonData["results"][0]);
      setLoading(false);
      //console.log(jsonData["results"][0]);
    } catch (error) {
      setLoadingText("Error on connecting to server...");
      //console.log("error fetching data: ", error);
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
      console.log(genreBg)
      setAppBgMovieGenre(genreBg);
    }
  };

  const handleMovieSelection = (movie) => {
    //console.log(movie);
    setSelectedSearchMovieName(movie);
    //console.log(selectedSearchMovieName);
  };

  const handleMovieBg = (moviePoster) => {
   // console.log(moviePoster);
    setBgImg(moviePoster);
  };

  const imageUrlStyle = {
    "--bg-image":
      bgImg === ""
        ? appBg && appBg.backdrop_path
          ? `url(${appBg.backdrop_path})`
          : ""
        : `url(${bgImg})`,
  };

  
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log("process.env.REACT_APP_API_SERVICE_GET_POPULAR_MOVIE_URL: ",config.REACT_APP_API_SERVICE_GET_POPULAR_MOVIE_URL);
    fetchNowPlayingMovieData();
  },[]);

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        //console.log(colorScheme); // "dark" or "light"
        setTheme(colorScheme);
      });
  }, []);

  return (
    <div
      className="Home w-full h-full"
      style={{ background: theme === "dark" ? "#dark" : "#light" }}
    >
      {loading && (
        <div className="loader">
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
              cardMovie={handleMovieSelection}
            />
          ) : (
            <MovieSearchPage
              key={selectedSearchMovieName}
              onMoviePoster={handleMovieBg}
              movie_name={selectedSearchMovieName}
              cardMovie={handleMovieSelection}
            />
          )}
        </div>
      </div>
    </div>
  );
};
