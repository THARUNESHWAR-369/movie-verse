import React, { useEffect, useState } from "react";
import { NavComponent } from "../../navigation/navComponent";
import { TitleCard } from "./titleCard";
import { ReviewCard } from "./reviewCard";

export const HomePage = () => {
  console.log(process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL);
  const [appBg, setAppBg] = useState(null);

  useEffect(() => {
    fetchNowPlayingMovieData();
  }, []);

  const fetchNowPlayingMovieData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL
      );
      const jsonData = await response.json();
      console.log(jsonData);

      setAppBg(jsonData);
    } catch (error) {
      console.log("error fetching data: ", error);
    }
  };

  const imageUrlStyle = {
    "--bg-image": appBg && appBg.poster_url ? `url(${appBg.poster_url})` : "",
  };

  return (
    <div className="Home w-full h-full">
      <div
        className="bg w-full h-screen bg-fixed bg-no-repeat bg-center bg-cover relative"
        style={imageUrlStyle}
      >
        <div className="main-container m-auto">
          <NavComponent></NavComponent>
          <div className="title-card-reviews flex justify-between p-[3.5rem] pt-[4rem]">
            <TitleCard
              movieTitle={appBg?.movie_title}
              movieOverview={appBg?.movie_overview}
              movieRating={appBg?.rating}
              movieGenres={appBg?.movie_genres}
            ></TitleCard>
            <ReviewCard></ReviewCard>
          </div>
        </div>
      </div>
    </div>
  );
};
