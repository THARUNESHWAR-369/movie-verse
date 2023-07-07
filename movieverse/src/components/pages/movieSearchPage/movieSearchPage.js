import React, { useEffect, useState, useRef } from "react";
import { FooterComponent } from "../../footerComponent/footerComponent";
import { CastSection } from "./castSection";

export const MovieSearchPage = ({ onMoviePoster, movie_name }) => {
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCurrencyOptions, setShowCurrencyOptions] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [formattedRevenue, setFormattedRevenue] = useState("INR");
  

  let menuRef = useRef();

  //console.log("movie_name: ", movie_name);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowCurrencyOptions(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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

        //console.log(movieDetails);

        const backdropPath = movieDetails["data"]["backdrop_path"];
        const posterPath = movieDetails["data"]["poster_path"];

        onMoviePoster(backdropPath ? backdropPath : posterPath);

        setMovieDetails(movieDetails["data"]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
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

  const toggleCurrencyOptions = () => {
    setShowCurrencyOptions(!showCurrencyOptions);
  };


  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    setShowCurrencyOptions(false);
  
    const updateFormattedRevenue = () => {
      if (movieDetails) {
        const formattedRevenue = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: movieDetails.revenue,
        })
          .formatToParts(Math.round(movieDetails.revenue).toFixed(0))
      
  
        setFormattedRevenue(formattedRevenue);
      }
    };
  
    updateFormattedRevenue();
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
      {movieDetails && (
        <section className=" h-[100%] flex flex-col">
          <div className="w-[100%] flex justify-center">
            <div className="w-[20rem] h-[30rem]">
              <img
                className="rounded-[1rem]"
                src={movieDetails.poster_path}
                alt="Movie Poster"
              />
            </div>
          </div>
          <div className="w-[100%] mt-[2rem] h-[100%] flex text-center ">
            <div className="movie-details-container-content w-[100%] font-bold ml-[1rem] text-center">
              <div className="w-full text-center items-center flex justify-center">
              <h1 className="text-[3rem] font-sans text-center">{movieDetails.title}</h1>
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
                <span className="text-center flex justify-center">
                  <b className="flex gap-3">
                    Release Date:
                    <p className="font-semibold">{movieDetails.release_date}</p>
                  </b>
                </span>
                <span className="flex justify-center font-extrabold pt-[0.8rem] pb-[0.5rem] text-center align-middle items-center gap-1">
                  <p className="bg-yellow-300 text-black p-[0.1rem] pl-2 pr-2 rounded-sm font-bold">
                    IMDB
                  </p>
                  <p>&#9733;</p>
                  <p className="text-sm">{movieDetails.vote_average}/10</p>
                </span>
                <span className="flex justify-center gap-2 tracking-wider align-middle text-center items-center">
                  <b>Budget: </b>
                  <p className="font-semibold">{movieDetails.budget}</p>
                </span>
                <span className="flex justify-center gap-2 tracking-wider align-middle text-center items-center">
                  <span className="flex gap-2">
                    <b>Revenue: </b>
                    <p className="font-semibold">{movieDetails.revenue}</p>
                    <div className="flex flex-row gap-1 w-[100%] h-[100%]">
                      <span
                        className="bg-gradient-to-r from-red-500 to-red-900 w-[30px] h-[30px] rounded-full flex justify-center items-center text-white text-lg font-extrabold cursor-pointer"
                        onClick={toggleCurrencyOptions}
                        ref={menuRef}
                      >
                        <i className="fa fa-language" aria-hidden="true"></i>
                      </span>
                      {showCurrencyOptions && (
                        <div className="">
                          <ul className="bg-white bg-opacity-40 absolute w-[7rem] rounded-sm backdrop-blur-md divide-y-4 divide-gray-800/25">
                            <li
                              className="cursor-pointer tracking-wider"
                              onClick={() => handleCurrencyChange("INR")}
                            >
                              INR ₹
                            </li>
                            <li
                              className="cursor-pointer tracking-wider"
                              onClick={() => handleCurrencyChange("USD")}
                            >
                              USD $
                            </li>
                            <li
                              className="cursor-pointer tracking-wider"
                              onClick={() => handleCurrencyChange("EUR")}
                            >
                              EUR €
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </span>
                </span>
                <span className="flex justify-center flex-row  gap-2 py-[0.2rem]">
                  <b>Runtime: </b>
                  <p className="font-semibold">{formatRuntime()}</p>{" "}
                </span>
                <span className="flex justify-center gap-2 py-[0.2rem]">
                  <b>Status: </b>
                  <p className="font-semibold text-green-400">
                    {movieDetails.status}
                  </p>
                </span>
              </div>
              <div className="w-auto h-[100%]">
                <CastSection movieId={movieDetails.id}></CastSection>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

/* 

      {movieDetails && (
        <section className="movie-details-section border-l-indigo-400 w-[100%] h-[100vh] flex">
          <div className="movie-details-poster w-[25rem] h-[30rem] rounded-[5rem]">
            <img
              className="rounded-[1rem] w-[100%] h-[100%]"
              src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
              alt="Movie Poster"
            />
          </div>
          <div className="movie-details-container-content w-[100%] font-bold ml-[1rem]">
            <h1 className="text-[3rem] font-sans">{movieDetails.title}</h1>
            <h5 className="font-normal tracking-wider pt-[0.1rem]">{movieDetails.tagline}</h5>
            <div className="movie-details-genre py-[1.2rem]">
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
            <div className="tracking-wider py-[0.6rem]">
              <b className="flex gap-3">
                Release Date:
                <p className="font-semibold">{movieDetails.release_date}</p>
              </b>
              <span className="flex font-extrabold pt-[0.8rem] pb-[0.5rem] text-center align-middle items-center gap-1">
                <p className="bg-yellow-300 text-black p-[0.1rem] pl-2 pr-2 rounded-sm font-bold">
                  IMDB
                </p>
                <p>&#9733;</p>
                <p className="text-sm">{movieDetails.vote_average}/10</p>
              </span>
              <span className="flex gap-2 tracking-wider align-middle text-center items-center">
                <b>Budget: </b>
                <p className="font-semibold">{movieDetails.budget}</p>
              </span>
              <span className="flex gap-2 tracking-wider align-middle text-center items-center">
                <b>Revenue: </b>
                <p className="font-semibold">{movieDetails.revenue}</p>
                <div className="flex flex-row gap-1 w-[100%] h-[100%]">
                  <span
                    className="bg-gradient-to-r from-red-500 to-red-900 w-[30px] h-[30px] rounded-full flex justify-center items-center text-white text-lg font-extrabold cursor-pointer"
                    onClick={toggleCurrencyOptions}
                    ref={menuRef}
                  >
                    <i className="fa fa-language" aria-hidden="true"></i>
                  </span>
                  {showCurrencyOptions && (
                    <div className="">
                      <ul className="bg-white bg-opacity-40 absolute w-[7rem] rounded-sm backdrop-blur-md divide-y-4 divide-gray-800/25">
                        <li
                          className="cursor-pointer tracking-wider"
                          onClick={() => handleCurrencyChange("INR")}
                        >
                          INR ₹
                        </li>
                        <li
                          className="cursor-pointer tracking-wider"
                          onClick={() => handleCurrencyChange("USD")}
                        >
                          USD $
                        </li>
                        <li
                          className="cursor-pointer tracking-wider"
                          onClick={() => handleCurrencyChange("EUR")}
                        >
                          EUR €
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </span>
              <span className="flex gap-2 py-[0.2rem]">
                <b>Runtime: </b>
                <p className="font-semibold">{formatRuntime()}</p>{" "}
                </span>
                <span className="flex gap-2 py-[0.2rem]">
                  <b>Status: </b>
                  <p className="font-semibold text-green-400">
                    {movieDetails.status}
                  </p>{" "}
                </span>
              </div>
              <CastSection movieId={movieDetails.id}></CastSection>
  
            </div>
          </section>
        )}
*/
