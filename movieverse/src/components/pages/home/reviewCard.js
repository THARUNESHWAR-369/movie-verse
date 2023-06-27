import React, { useEffect, useState } from "react";
import imdbLogo from "../../../static/images/imdb.png";

export const ReviewCard = ({ movieId }) => {
  console.log(movieId);
  const [reviewCard, setReviewCard] = useState(null);

  console.log(
    process.env.REACT_APP_API_SERVICE_GET_MOVIE_REVIEW_URL,
    process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL
  );
  useEffect(() => {
    fetchMovieReview();
  }, []);

  const fetchMovieReview = async () => {
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
      console.log(movieReviews["data"]["results"]);
      setReviewCard(movieReviews["data"]["results"]);
    }
  };

  return (
    <div className="review-card w-[60%] mr-[10px] p-[10px] h-29rem">
        <h3 className="text-white font-semibold text-center tracking-wider">Movie Review</h3>
      <ul>
        {reviewCard &&
          reviewCard.slice(0, 7).map((review, index) => (
            <a target="_black" href={review['url']} key={index}><li
              key={index}
              className="review-card-li flex gap-0  align-middle w-full "
            >
              <div className="review-card-img rounded-full w-12 h-12 bg-gray-600">
              <img className="w-full h-full rounded-full" src={review['author_details']['avatar_path'] ? "https://image.tmdb.org/t/p/original" + review['author_details']['avatar_path'] : ""}
                  alt={""}
                ></img>
              </div>
              <div className="review-card-username text-sm">
                <h3 className="text-white font-semibold">{review['author_details']['username']}</h3>
                <span className="flex text-white">
                  <h3 className="text-white font-medium">{review['author_details']['name'] !== '' ? review['author_details']['name'] : review['author'] },</h3>
                  <p className="text-white pl-1">
          
                    <b>IMDB</b>
                  </p>
                  <p id="review-p-start"> &#9733; </p>
                  <p> {review['author_details']['rating'] == null ? 0.0 : review['author_details']['rating']}/10</p>
                </span>
              </div>
            </li></a>
          ))}
      </ul>
    </div>
  );
};
