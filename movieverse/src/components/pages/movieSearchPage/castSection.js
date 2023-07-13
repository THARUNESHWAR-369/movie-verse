/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";

export const CastSection = ({ movieId }) => {
  const [castDetails, setCastDetails] = useState(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useEffect(() => {
    const fetchCastDetails = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_SERVICE_GET_CAST_DETAILS_URL,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ movie_id: movieId }),
          }
        );
        if (response.ok) {
          const castDetailsJson = await response.json();
  
          // Handle the movie reviews data
          //console.log(castDetailsJson);
          setCastDetails(castDetailsJson["results"]);
          //setLoading(false); // Set loading to false after fetching the data
        }
      } catch (e) {
        // setLoading(false);
      }
    };
    fetchCastDetails();
  }, []);



  const handleLeftArrowClick = () => {
    if (leftArrowRef.current) {
      const cards = document.getElementsByClassName("cast-card-cards")[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft -= 140;
    }
  };

  const handleRightArrowClick = () => {
    if (rightArrowRef.current) {
      const cards = document.getElementsByClassName("cast-card-cards")[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft += 140;
    }
  };

  return (
    <div className="cast-card text-white ml-13">
      <h2 className="font-bold text-4xl float-left">Cast </h2>
      <div className="cast-card-controller p-[1.5rem]">
        <i
          ref={leftArrowRef}
          id="leftArrow"
          className="leftArrow fa fa-chevron-left"
          onClick={handleLeftArrowClick}
          style={{ left: `-5.5rem`, bottom: `-8.5rem` }}
        ></i>
        <i
          ref={rightArrowRef}
          id="rightArrow"
          className="rightArrow fa fa-chevron-right"
          onClick={handleRightArrowClick}
          style={{ right: `-2.5rem`, bottom: `-6.5rem` }}
        ></i>
      </div>
      <div className="cast-card-cards justify-center snap-mandatory snap-x  scroll-smooth ">
        {castDetails &&
          castDetails.map((castDetail, index) => (
            <div
              className="cast-card-card cursor-pointer snap-start scroll-ml-6"
              key={index}
            >
              <div className="cast-card-content bg-black ">
                <img
                  loading="lazy"
                  className="w-full h-full"
                  src={castDetail["profile_path"]}
                  alt={castDetail.title}
                />

                <div className="bg-blue-200">
                  <span className="p-[0.4rem] flex justify-center w-auto tracking-wider">
                    <b className="text-1xl align-middle text-center">
                      Original Name:
                      <p className="text-sm m-[0.1rem] font-normal">
                        {castDetail.original_name}
                      </p>
                    </b>
                  </span>
                  {castDetail.character && castDetail.character !== "" && (
                    <span className="p-[0.4rem] flex justify-center w-auto tracking-wider">
                      <b className="text-1xl flex flex-col justify-center align-middle text-center items-center">
                        Character Name:
                        <p className="text-sm m-[0.1rem] font-thin">
                          {castDetail.character}
                        </p>
                      </b>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
