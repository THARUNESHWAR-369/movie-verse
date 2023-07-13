import React, { useEffect, useState } from "react";
import angry from '../../../static/sentiment_emoji/angry.png'
import happy from '../../../static/sentiment_emoji/happy.png'

export const MovieReviewSection = ({ movieId }) => {
  const [movieReviewCard, setMovieReviewCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
         // console.log(movieReviews["results"]);
          setMovieReviewCard(movieReviews["results"]);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    };
    fetchMovieReview();
  }, []);

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
          <div className="review-card-cards w-[100%] snap-mandatory snap-x  scroll-smooth  h-[300px] flex justify-start gap-2 overflow-auto relative top-[1rem] ">
            {movieReviewCard &&
              movieReviewCard.map((movieReviewCards, index) => (
                <div
                  className="snap-start scroll-ml-6 review-card bg-gradient-to-b from-[#ed213a] to-[#93291e] rounded-md w-[500px] min-w-[20em] p-[0.6em] text-center sm:min-w-[16em] lg:min-w-[22em]"
                  key={index}
                >
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
                    <span className="w-[35px] h-[35px] absolute rounded-full left-0 top-0">
                      <img
                        src={movieReviewCards.sentiment === 0 ? angry : happy}
                        alt={movieReviewCards.name}
                      ></img>
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
