import React, { useEffect, useState, useRef } from "react";

export const MovieReviewSection = ({ movieId }) => {
  const [movieReviewCard, setMovieReviewCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  useEffect(() => {
    fetchMovieReview();
  }, []);

  const fetchMovieReview = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_SERVICE_GET_MOVIE_REVIEW_URL,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movie_id: movieId }),
        }
      );
      if (response.ok) {
        const movieReviews = await response.json();
        console.log(movieReviews["data"]["results"]);
        setMovieReviewCard(movieReviews["data"]["results"]);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleLeftArrowClick = () => {
    if (leftArrowRef.current) {
      const cards = document.getElementsByClassName("review-card-cards")[0];
      console.log(cards.scrollLeft);
      cards.scrollLeft -= 140;
    }
  };

  const handleRightArrowClick = () => {
    if (rightArrowRef.current) {
      const cards = document.getElementsByClassName("review-card-cards")[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft += 140;
    }
  };

  return (
    <div className="text-white ml-13 flex flex-col">
      <h2 className="font-bold text-4xl float-left">Movie Review </h2>
      {loading && (
        <div className="loaderReview z-[100000000]">
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}
      {movieReviewCard && movieReviewCard.length === 0 && (
        <div className="flex justify-center">
          <p className="text-red-500 font-semibold tracking-wider">
            No Reviews found
          </p>
        </div>
      )}

      {movieReviewCard && movieReviewCard.length > 0 && (
        <div className="text-white ml-13">
          <div className="review-card-controller p-[1.5rem]">
            <i
              ref={leftArrowRef}
              id="leftArrow"
              className="leftArrow fa fa-chevron-left"
              onClick={handleLeftArrowClick}
              style={{ left: `-2.5rem` }}
            ></i>
            <i
              ref={rightArrowRef}
              id="rightArrow"
              className="rightArrow fa fa-chevron-right"
              onClick={handleRightArrowClick}
              style={{ right: `-2.5rem` }}
            ></i>
          </div>
          <div className="review-card-cards w-[100%] snap-mandatory snap-x h-[300px] flex justify-start gap-2 overflow-auto scroll-smooth relative top-[-4rem] ">
            {movieReviewCard &&
              movieReviewCard.map((movieReviewCards, index) => (
                <div className="review-card bg-gradient-to-b from-[#ed213a] to-[#93291e] rounded-md snap-start scroll-ml-6 w-[500px] min-w-[20em] p-[0.6em] text-center sm:min-w-[16em] lg:min-w-[22em]">
                  <div className="border-b-2 relative border-white border-opacity-25 pb-[0.6em]">
                    <img
                      className="rounded-full m-auto w-[6em] h-[6em]"
                      src={movieReviewCards.author_details.avatar_path}
                      alt={movieReviewCards.name}
                    ></img>
                    <span className="w-[25px] h-[25px] absolute rounded-full right-0 top-0">
                      <a
                        href={movieReviewCards.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i
                          className="fa fa-external-link"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </span>
                  </div>
                  <div className="border-b-2 border-white border-opacity-25 p-[0.3em]">
                    <p>{movieReviewCards.name}</p>
                  </div>
                  <div className=" py-[0.3em] text-justify overflow-hidden line-clamp-5">
                    <p className="h-[119px]">{movieReviewCards.content}</p>
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
     background: orange;
    width: 25px;
    height: 25px;
    position: absolute;
    border-radius: 50%;
    right: 0;
    top: 0;
*/
