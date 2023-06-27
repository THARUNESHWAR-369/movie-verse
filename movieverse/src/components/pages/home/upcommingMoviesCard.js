import React, { useEffect, useState, useRef } from "react";

export const UpCommingMoviesCard = () => {
  const [UpcomingMovieData, setUpcomingMovieData] = useState(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useEffect(() => {
    fetchUpcomingMovieDataMovieData();
  }, []);

  const fetchUpcomingMovieDataMovieData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_SERVICE_GET_UPCOMMING_MOVIE_URL
      );
      const jsonData = await response.json();
      console.log("up moives: ", jsonData);

      setUpcomingMovieData(jsonData['data']["results"]);
    } catch (error) {
      console.log("error fetching data: ", error);
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

  return (
    <div className="up-card text-white ml-13 mb-9">
      <h2 className="font-bold text-2xl">Upcoming Movies</h2>
      <div className="popular-card-controller">
        <i
          ref={leftArrowRef}
          id="leftArrowUP"
          className="leftArrow fa fa-chevron-left"
          onClick={handleLeftArrowClick}
        ></i>
        <i
          ref={rightArrowRef}
          id="rightArrowUP"
          className="rightArrow fa fa-chevron-right"
          onClick={handleRightArrowClick}
        ></i>
      </div>
      <div className="up-card-cards">
        {UpcomingMovieData &&
          UpcomingMovieData.map((popularMovie, index) => (
            <a href="#" className="popular-card-card">
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
                    <p>2000-09-20</p>
                </div>
              </div>
            </a>
          ))}
      </div>
    </div>
  );
};
