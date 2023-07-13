/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

export const ReviewCard = ({ movieId }) => {
  const [reviewCard, setReviewCard] = useState(null);
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
  
          // Handle the movie reviews data
          //console.log(movieReviews["data"]["results"]);
          setReviewCard(movieReviews["results"]);
          setLoading(false); // Set loading to false after fetching the data
        }
      } catch (e) {
        setLoading(false);
      }
    };
    fetchMovieReview();
  }, []);




  return (
    <div className="review-card w-[60%] h-29rem max-w-[30rem]">
      <h3 className="text-white font-semibold text-center tracking-wider text-xl">
        Movie Review
      </h3>
      {loading && (
        <div className="loaderReview z-[100000000]">
          <div className="spinner-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      )}
      <ul>
      {reviewCard && reviewCard.length === 0 && <div className="flex justify-center"><p className="text-red-500 font-semibold tracking-wider">No Reviews found</p></div>}
        {reviewCard &&
          reviewCard.slice(0, 7).map((review, index) => (
            <a target="_black" href={review["url"]} key={index}>
              <li
                key={index}
                className="review-card-li flex gap-0  align-middle w-full "
              >
                <div className="review-card-img rounded-full w-12 h-12 bg-gray-600">
                  <img loading="lazy"
                    className="w-full h-full rounded-full"
                    src={
                      review["author_details"]["avatar_path"]
                        ? "https://image.tmdb.org/t/p/original" +
                          review["author_details"]["avatar_path"]
                        : ""
                    }
                    alt={""}
                  ></img>
                </div>
                <div className="review-card-username text-sm">
                  <h3 className="text-white font-semibold">
                    {review["author_details"]["username"]}
                  </h3>
                  <span className="flex text-white">
                    <h3 className="text-white font-medium">
                      {review["author_details"]["name"] !== ""
                        ? review["author_details"]["name"]
                        : review["author"]}
                      ,
                    </h3>
                    <p className="text-white pl-1">
                      <b>IMDB</b>
                    </p>
                    <p id="review-p-start"> &#9733; </p>
                    <p>
                      {" "}
                      {review["author_details"]["rating"] == null
                        ? 0.0
                        : review["author_details"]["rating"]}
                      /10
                    </p>
                  </span>
                </div>
              </li>
            </a>
          ))}
      </ul>
    </div>
  );
};
