import React, { useEffect, useState, useRef } from "react";

export const CastSection = ({ movieId }) => {
  const [castDetails, setCastDetails] = useState(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useEffect(() => {
    fetchCastDetails();
  }, []);

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
        console.log(castDetailsJson);
        setCastDetails(castDetailsJson["results"]);
        //setLoading(false); // Set loading to false after fetching the data
      }
    } catch (e) {
      // setLoading(false);
    }
  };

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
      <h2 className="font-bold text-2xl float-left">Cast </h2>
      <div className="cast-card-controller p-[1.5rem]">
        <i
          ref={leftArrowRef}
          id="leftArrow"
          className="leftArrow fa fa-chevron-left"
          onClick={handleLeftArrowClick}
          style={{left: `-4rem`}}
        ></i>
        <i
          ref={rightArrowRef}
          id="rightArrow"
          className="rightArrow fa fa-chevron-right"
          onClick={handleRightArrowClick}
          style={{right: `-2.5rem`}}
        ></i>
      </div>
      <div className="cast-card-cards">
  {castDetails &&
    castDetails.map((castDetail, index) => (
      <a href="#" className="cast-card-card" key={index}>
        <div className="cast-card-content">
          <img loading="lazy"
            className="w-full h-full"
            src={castDetail["profile_path"]}
            alt={castDetail.title}
          />


  
        </div>
      </a>
    ))}
</div>

    </div>
  );
};

/*
{castDetails &&
            castDetails.map((castDetail, index) => (
              <a href="#" className="w-[165px] h-[249px] border-[1px] border-white rounded-[10px] bg-black transition duration-300 overflow-hidden" key={index}>
                <div className="cast-card-content">
                  <img
                    loading="lazy"
                    className="w-full h-full"
                    src={castDetail["profile_path"]}
                  ></img>
                </div>
              </a>
            ))}

*/
