import React, { useEffect, useState, useRef } from "react";
import config from "../../../config/config";

export const UpComingMoviesCard = ({ CardMovieClick }) => {
  const [UpcomingMovieData, setUpcomingMovieData] = useState(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUpcomingMovieData();
  }, []);

  const fetchUpcomingMovieData = async () => {
    try {
      const response = await fetch(
        config.REACT_APP_API_SERVICE_GET_UPCOMING_MOVIE_URL
      );
      const jsonData = await response.json();
      //console.log("up coming movies: ", jsonData["results"]);
      setLoading(false);
      setUpcomingMovieData(jsonData["results"]);
    } catch (error) {
      //console.log("error fetching data: ", error);
      setLoading(true);
    }
  };

  const handleLeftArrowClick = () => {
    if (leftArrowRef.current) {
      const cards = document.getElementsByClassName("up-card-cards")[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft -= 140;
    }
  };

  const handleRightArrowClick = () => {
    if (rightArrowRef.current) {
      const cards = document.getElementsByClassName("up-card-cards")[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft += 140;
    }
  };

  const handleMovieClick = (movie) => {
    CardMovieClick(movie["title"]);
  };

  return (
    <div className="popular-card text-white ml-13">
      <h2 className="font-bold text-2xl">Upcoming Movies</h2>
      <div className="popular-card-controller">
      <i
          ref={leftArrowRef}
          id="leftArrow"
          className="leftArrow fa fa-chevron-left"
          onClick={handleLeftArrowClick}
          style={{ left: `-1rem`, bottom: `-8.5rem` }}
        ></i>
        <i
          ref={rightArrowRef}
          id="rightArrow"
          className="rightArrow fa fa-chevron-right"
          onClick={handleRightArrowClick}
          style={{ right: `-1rem`, bottom: `-6.5rem` }}
        ></i>
      </div>
      <div className="popular-card-cards up-card-cards">
        {loading && (
          <div className="loaderReview z-[100000000]">
            <div className="spinner-container">
              <div className="loading-spinner"></div>
            </div>
          </div>
        )}
        {UpcomingMovieData &&
          UpcomingMovieData.map((popularMovie, index) => (
            <div
              onClick={() => handleMovieClick(popularMovie)}
              className="popular-card-card cursor-pointer snap-start scroll-ml-6"
              key={index}
            >
              <div className="popular-card-content">
                <img
                  className="w-full h-full"
                  src={
                    "https://image.tmdb.org/t/p/original" +
                    popularMovie["poster_path"]
                  }
                  alt=""
                ></img>

                <span className="p-[0.4rem] flex justify-center">
                  <p className="text-black bg-yellow-400 p-[0.2rem] rounded-sm w-fit">
                    IMDB
                  </p>
                  <p className="text-sm m-[0.1rem]">&#9733;</p>
                  <p className="text-sm m-[0.1rem] font-bold">
                    {popularMovie["vote_average"]}/10
                  </p>
                </span>

                <div className="popular-card-date">
                  <p>{popularMovie["release_date"]}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
