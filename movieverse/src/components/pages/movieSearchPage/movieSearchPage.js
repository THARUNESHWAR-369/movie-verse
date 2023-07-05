import React, { useEffect, useState, useRef } from "react";

export const MovieSearchPage = ({ onMoviePoster, movie_name }) => {
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState(null);
  const [showCurrencyOptions, setShowCurrencyOptions] = useState(false);
  const [currency, setCurrency] = useState("INR");

  let menuRef = useRef();

  console.log("movie_name: ",movie_name);

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
    console.log("movie_name: ",movie_name);
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

        console.log(movieDetails);

        const backdropPath = movieDetails["data"]["backdrop_path"];
        const posterPath = movieDetails["data"]["poster_path"];

        onMoviePoster(backdropPath ? backdropPath : posterPath);

        setMovieDetails(movieDetails["data"]);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error fetching movie details:", error);
    }
  };

  const formattedRevenue = movieDetails
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currency,
      })
        .formatToParts(Math.round(movieDetails.revenue).toFixed(0))
        .map((part) =>
          part.type === "currency"
            ? part.value.replace("INR", currency)
            : part.value
        )
        .join("")
    : null;

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
  };

  return (
    <div className="MovieSearchContainer text-white w-[100%] h-[100vh] p-[1rem] ">
      {loading && (
        <div className="loader z-[100000000]">
          <div className="spinner-container">
            <div className="loading-spinner"></div>
            <p className="m-[0.5rem] tracking-[1.5px] font-bold"></p>
          </div>
        </div>
      )}
      {movieDetails && (
        <section className="movie-details-section border-l-indigo-400 w-[100%] h-[100vh] flex">
          <div className="movie-details-poster w-[30rem] h-[30rem] rounded-[5rem]">
            <img
              className="rounded-[1rem] w-[100%] h-[100%]"
              src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
              alt="Movie Poster"
            />
          </div>
          <div className="movie-details-container-content w-[100%] font-bold ml-[1rem]">
            <h1 className="text-[3rem] font-sans">{movieDetails.title}</h1>
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
                <p className="font-semibold">{formatRuntime()}</p> {/* Display formatted runtime */}
              </span>
              <span className="flex gap-2 py-[0.2rem]">
                <b>Status: </b>
                <p className="font-semibold text-green-400">{movieDetails.status}</p> {/* Display formatted runtime */}
              </span>
            </div>
          </div>
        </section>
      )}
    </div>

  );
};
