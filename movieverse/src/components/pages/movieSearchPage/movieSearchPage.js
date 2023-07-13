import React, { useEffect, useState, useRef } from "react";
import { FooterComponent } from "../../footerComponent/footerComponent";
import { CastSection } from "./castSection";
import { ProductionSection } from "./productionCardSection";
import {MovieReviewSection} from "./movieReviewCard";
import { RecommendationSection } from "./recommendationSection";

export const MovieSearchPage = ({ onMoviePoster, movie_name, cardMovie }) => {
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);
  const [errorTxt, setErrorTxt] = useState(false);

  let menuRef = useRef();

  //console.log("movie_name: ", movie_name);

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchMovieDetails();
  }, []);


  const fetchMovieDetails = async () => {
    // console.log("movie_name: ", movie_name);
    try {
      const response = await fetch(
        process.env.REACT_APP_API_SERVICE_GET_MOVIE_DETAILS_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movie_name: movie_name }),
        }
      );
      if (response.ok) {
        const movieDetails = await response.json();

       // console.log(movieDetails['results'][0]);

        const backdropPath = movieDetails['results'][0]["backdrop_path"];
        const posterPath = movieDetails['results'][0]["poster_path"];

        onMoviePoster(backdropPath ? backdropPath : posterPath);
        setMovieDetails(movieDetails['results'][0]);
        setLoading(false);
        setErrorTxt(false);
      }
    } catch (error) {
      setLoading(false);
      const backdropPath =
        "https://img.freepik.com/free-vector/white-abstract-background_23-2148817571.jpg";
      onMoviePoster(backdropPath);
      setErrorTxt(true);
      //console.log("Error fetching movie details:", error);
    }
  };

  const formatRuntime = () => {
    if (!movieDetails || !movieDetails.runtime) return null;

    const runtimeHours = Math.floor(movieDetails.runtime / 60);
    const runtimeMinutes = movieDetails.runtime % 60;
    const formattedRuntime = `${runtimeHours}h ${runtimeMinutes}m`;

    return formattedRuntime;
  };



  const handleCardMovie = (movie) => {
    cardMovie(movie);
  };

  return (
    <div className="MovieSearchContainer text-white w-[100%] h-[100%] p-[1rem]">
      {loading && (
        <div className="loader z-[100000000]">
          <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p className="m-[0.5rem] tracking-[1.5px] font-bold"></p>
          </div>
        </div>
      )}
      {errorTxt && (
        <div className="text-center movie-not-found font-bold">
          <p className="tracking-wider text-5xl">Movie not found Search</p>
          <p className="tracking-widest p-2">(Search again or check the spelling)</p>
        </div>
      )}
      {movieDetails && (
        <div>
          <section className=" h-[100%] flex flex-row max-w-[90rem] w-[100%] m-auto">
            <div className="flex justify-center w-auto">
              <div className="w-[20rem] h-[30rem]">
                <img
                  className="rounded-[1rem]"
                  src={movieDetails.poster_path}
                  alt="Movie Poster"
                />
              </div>
            </div>
            <div className="w-[100%] max-w-[95%] h-[100%] flex text-center justify-center pl-[1rem]">
              <div className="movie-details-container-content w-[100%] font-bold text-center">
                <div className="w-full text-center items-center flex justify-center">
                  <h1 className="text-[3rem] font-sans text-center">
                    {movieDetails.title}
                  </h1>
                </div>
                <h5 className="font-normal tracking-wider pt-[0.1rem] italic">
                  {movieDetails.tagline}
                </h5>
                <div className="movie-details-genre text-center flex justify-center py-[1.2rem]">
                  <ul className="font-normal flex flex-row gap-2">
                    {movieDetails.genres &&
                      movieDetails.genres.map((genre, index) => (
                        <li
                          key={index}
                          className="text-white flex text-center items-center align-middle cursor-pointer border-2 w-fit p-[0.2rem] px-[0.9rem] rounded-[1rem] border-white hover:backdrop-blur-lg hover:bg-white hover:bg-opacity-40"
                        >
                          {genre}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="movie-details-overview font-normal tracking-wider text-justify">
                  <p>{movieDetails.overview}</p>
                </div>
                <div className="tracking-wider text-center py-[0.6rem]">
                <span className="text-center flex">
                    <b className="flex gap-3">
                      Release Date:
                      <p className="font-semibold">
                        {movieDetails.release_date}
                      </p>
                    </b>
                  </span>

                  <span className="text-center flex">
                    <b className="flex gap-3">
                      Original language:
                      <p className="font-semibold text-blue-500">
                        {movieDetails.original_language}
                      </p>
                    </b>
                  </span>
                  <span className="flex font-extrabold pt-[0.8rem] pb-[0.5rem] text-center align-middle items-center gap-1">
                    <p className="bg-yellow-300 text-black p-[0.1rem] pl-2 pr-2 rounded-sm font-bold">
                      IMDB
                    </p>
                    <p>&#9733;</p>
                    <p className="text-sm text-yellow-300">{movieDetails.vote_average}/10</p>
                  </span>
                  <span className="flex  gap-2 tracking-wider align-middle text-center items-center">
                    <b>Budget: </b>
                    <p className="font-semibold">${movieDetails.budget}</p>
                  </span>
                  <span className="flex gap-2 tracking-wider align-middle text-center items-center">
                    <span className="flex gap-2">
                      <b>Revenue: </b>
                      <p className="font-semibold">${movieDetails.revenue}</p>
                    </span>
                  </span>
                  <span className="flex flex-row  gap-2 py-[0.2rem]">
                    <b>Runtime: </b>
                    <p className="font-semibold">{formatRuntime()}</p>{" "}
                  </span>
                  <span className="flex gap-2 py-[0.2rem]">
                    <b>Status: </b>
                    <p className="font-semibold text-green-400">
                      {movieDetails.status}
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="w-[100%] max-w-[90rem] m-auto h-[100%] pt-[2rem]">
            <ProductionSection movieId={movieDetails.id}></ProductionSection>
          </div>

          <div className="w-[100%] max-w-[90rem] m-auto h-[100%] pt-[3rem]">
            <CastSection movieId={movieDetails.id}></CastSection>
          </div>

          <div className="w-[100%] max-w-[90rem] m-auto h-[100%] pt-[1.5rem]">
            <MovieReviewSection movieId={movieDetails.id}></MovieReviewSection>
          </div>

          <div className="w-[100%] max-w-[90rem] m-auto h-[100%] pt-[4rem]">
            <RecommendationSection movieId={movieDetails.id} CardMovieClick={handleCardMovie}></RecommendationSection>
          </div>

          
        </div>
      )}
      <div className="pt-[2rem]">
      <FooterComponent></FooterComponent>
      </div>
    </div>
  );
};
