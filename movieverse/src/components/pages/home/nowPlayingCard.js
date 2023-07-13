import React, { useEffect, useState, useRef } from "react";

export const NowPlayingCard = ({ CardMovieClick }) => {
  const [NowPlayingMovieData, setNowPlayingMovieData] = useState(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useEffect(() => {
    const fetchNowPlayingMovieData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL
        );
        const jsonData = await response.json();
       // console.log("setNowPlayingMovieData: ", jsonData["results"]);
  
        setNowPlayingMovieData(jsonData["results"]);
      } catch (error) {
        //console.log("error fetching data: ", error);
      }
    };
    fetchNowPlayingMovieData();
  }, []);



  const handleLeftArrowClick = () => {
    if (leftArrowRef.current) {
      const cards = document.getElementsByClassName("np-card-cards")[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft -= 140;
    }
  };

  const handleRightArrowClick = () => {
    if (rightArrowRef.current) {
      const cards = document.getElementsByClassName("np-card-cards")[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft += 140;
    }
  };

  const handleMovieClick = (movie) => {
    CardMovieClick(movie["title"]);
  };

  return (
    <div className="popular-card text-white ml-13">
      <h2 className="font-bold text-2xl">Now Playing</h2>
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
          style={{ right: `-1rem`, bottom: `-6rem` }}
        ></i>
      </div>
      <div className="popular-card-cards np-card-cards  snap-mandatory snap-x  scroll-smooth ">
        {NowPlayingMovieData &&
          NowPlayingMovieData.map((popularMovie, index) => (
            <div
              onClick={() => handleMovieClick(popularMovie)}
              className="popular-card-card cursor-pointer snap-start scroll-ml-6"
              key={index}
            >
              <div className="popular-card-content">
                <img
                  loading="lazy"
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
                  <p>{popularMovie["release_date"]}</p>{" "}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
