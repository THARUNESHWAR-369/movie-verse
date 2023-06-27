import React, { useEffect, useState, useRef } from "react";

export const NowPlayingCard = () => {
  const [NowPlayingMovieData, setNowPlayingMovieData] = useState(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useEffect(() => {
    fetchNowPlayingMovieData();
  }, []);

  const fetchNowPlayingMovieData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_SERVICE_GET_NOWPLAYING_MOVIE_URL
      );
      const jsonData = await response.json();
      console.log("setNowPlayingMovieData: ", jsonData['data']["results"]);

      setNowPlayingMovieData(jsonData['data']["results"]);
    } catch (error) {
      console.log("error fetching data: ", error);
    }
  };

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

  return (
    <div className="popular-card text-white ml-13">
      <h2 className="font-bold text-2xl">Now Playing</h2>
      <div className="popular-card-controller">
        <i
          ref={leftArrowRef}
          id="leftArrow"
          className="leftArrow fa fa-chevron-left"
          onClick={handleLeftArrowClick}
        ></i>
        <i
          ref={rightArrowRef}
          id="rightArrow"
          className="rightArrow fa fa-chevron-right"
          onClick={handleRightArrowClick}
        ></i>
      </div>
      <div className="popular-card-cards np-card-cards">
        {NowPlayingMovieData &&
          NowPlayingMovieData.map((popularMovie, index) => (
            <a href="#" className="popular-card-card"  key={index}>
              <div className="popular-card-content">
                <img
                  className="w-full h-full"
                  src={
                    "https://image.tmdb.org/t/p/original" + popularMovie['poster_path']
                  }
                ></img>

                <span className="p-[0.4rem] flex justify-center">
                  <p className="text-black bg-yellow-400 p-[0.2rem] rounded-sm w-fit">
                    IMDB
                  </p>
                  <p className="text-sm m-[0.1rem]">&#9733;</p>
                  <p className="text-sm m-[0.1rem] font-bold">{popularMovie['vote_average']}/10</p>
                </span>

                <div className="popular-card-date">
                <p>{popularMovie['release_date']}</p>                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};
