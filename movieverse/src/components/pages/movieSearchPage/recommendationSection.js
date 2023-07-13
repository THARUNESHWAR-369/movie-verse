/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";

export const RecommendationSection = ({ movieId, CardMovieClick }) => {
  const [recommendationDetails, setRecommendationDetails] = useState(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useEffect(() => {
    const fetchRecommendationDetails = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_SERVICE_GET_RECOMMENDATION_DETAILS_URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ movie_id: movieId }),
          }
        );
        if (response.ok) {
          const recommendationDetailJson = await response.json();
  
          // console.log(recommendationDetailJson);
          setRecommendationDetails(recommendationDetailJson["results"]);
        }
      } catch (e) {
        // setLoading(false);
      }
    };
    fetchRecommendationDetails();
  }, []);



  const handleLeftArrowClick = () => {
    if (leftArrowRef.current) {
      const cards = document.getElementsByClassName(
        "recommendation-section"
      )[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft -= 140;
    }
  };

  const handleRightArrowClick = () => {
    if (rightArrowRef.current) {
      const cards = document.getElementsByClassName(
        "recommendation-section"
      )[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft += 140;
    }
  };

  const handleMovieClick = (movie) => {
    CardMovieClick(movie["title"]);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold">Recommended Movies</h1>
      {recommendationDetails && recommendationDetails.length === 0 && (
        <div className="flex justify-center">
          <p className="text-red-500 font-semibold tracking-wider">
            No Recommendation found
          </p>
        </div>
      )}
      {recommendationDetails && recommendationDetails.length > 0 && (
        <div>
          <div className="cast-card-controller p-[1.5rem]">
            <i
              ref={leftArrowRef}
              id="leftArrow"
              className="leftArrow fa fa-chevron-left"
              onClick={handleLeftArrowClick}
              style={{ left: `-2.5rem`, bottom: `-12.5rem` }}
            ></i>
            <i
              ref={rightArrowRef}
              id="rightArrow"
              className="rightArrow fa fa-chevron-right"
              onClick={handleRightArrowClick}
              style={{ right: `-2.5rem`, bottom: `-10.5rem` }}
            ></i>
          </div>
          <div className="recommendation-section w-[100%] top-[-3em] flex overflow-auto relative pt-[3em] gap-3 snap-mandatory snap-x  scroll-smooth justify-start">
            {recommendationDetails &&
              recommendationDetails.map((recommendationDetail, index) => (
                <div
                  className="bg-gradient-to-b from-[#ed213a] to-[#93291e] w-[14em] max-w-[14em] h-[20em] snap-start scroll-ml-6 rounded-md relative text-white shadow-2xl"
                  key={index}
                >
                  <div className="w-[99px] h-[99px] m-auto absolute top-[-3em] left-14 shadow-lg">
                    <img
                      className="w-[100%] h-[100%] rounded-md"
                      src={recommendationDetail["poster_path"]}
                      alt={recommendationDetail["id"]}
                    ></img>
                  </div>
                  <div className="w-[14em] max-w-[14em] pt-[3.75rem] px-[0.3em] h-[100%] relative">
                    <ul className="m-[1px] px-[0.2em] overflow-hidden line-clamp-5 text-ellipsis w-[100%]">
                      <li className=" text-lg py-[0.4em] h-[3.4em] overflow-hidden line-clamp-2 text-ellipsis text-center">
                        <b>{recommendationDetail["original_title"]}</b>
                      </li>
                      <li className="text-sm py-[0.4em] h-[4.4em]">
                        <ul className="font-normal flex flex-row gap-2 text-sm flex-wrap overflow-hidden line-clamp-2 text-ellipsis">
                          {recommendationDetail.genres &&
                            recommendationDetail.genres
                              .slice(0, 4)
                              .map((genre, index) => (
                                <li
                                  key={index}
                                  className="text-white flex text-center items-center align-middle cursor-pointer border-2 w-fit px-[0.6em] rounded-[1rem] border-white hover:backdrop-blur-lg hover:bg-white hover:bg-opacity-40"
                                >
                                  {genre}
                                </li>
                              ))}
                        </ul>
                      </li>
                      <li className="text-sm py-[0.4em]">
                        <b>Release Date: </b>
                        {recommendationDetail["release_date"]}
                      </li>
                      <li className="text-sm py-[0.3em]">
                        <span className="flex font-extrabold text-start gap-1 items-center">
                          <p className="bg-yellow-300 text-black p-[0.1rem] pl-2 pr-2 rounded-sm font-bold">
                            IMDB
                          </p>
                          <p>★</p>
                          <p className="text-sm py-[0.4em]">
                            {recommendationDetail["vote_average"]}/10
                          </p>
                        </span>
                      </li>
                    </ul>
                    <div className="w-[13.4em] px-[3px] absolute bottom-[0.7em]">
                      <button
                        onClick={() => handleMovieClick(recommendationDetail)}
                        className="w-[100%] border-2 text-white border-white rounded-md text-base cursor-pointer tracking-wider"
                      >
                        Go
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

/*
  bottom: 0.7em;
    width: 13.4em;
    padding-left: 3px;
    padding-right: 3px;
}


*/
