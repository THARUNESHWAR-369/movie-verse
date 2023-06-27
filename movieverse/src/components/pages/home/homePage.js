import React, { useEffect, useState } from "react";
import { NavComponent } from "../../navigation/navComponent";
import { TitleCard } from "./titleCard";
import { ReviewCard } from "./reviewCard";
import { PopularCard } from "./popularCard";
import { NowPlayingCard } from "./nowPlayingCard";
import { UpComingMoviesCard } from "./upcomingMoviesCard";

export const HomePage = () => {
  const [appBg, setAppBg] = useState(null);

  const [appBgMovieGenre, setAppBgMovieGenre] = useState(null);

  useEffect(() => {
    fetchNowPlayingMovieData();
  }, []);


  const fetchNowPlayingMovieData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL
      );
      const jsonData = await response.json();
      console.log(jsonData['data']['results'][0]);
      fetchBgMovieGenre(jsonData['data']['results'][0]['genre_ids']);
      setAppBg(jsonData['data']['results'][0]);
    } catch (error) {
      console.log("error fetching data: ", error);
    }
  };

  const fetchBgMovieGenre = async ({genre_id}) => {
    const response = await fetch(
      process.env.REACT_APP_API_SERVICE_GET_MOVIE_GENRE_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie_genre: genre_id }),
      }
    );
    if (response.ok) {
      const genreBg = await response.json();

      // Handle the movie reviews data
      console.log("genreBg: ",genreBg);
      setAppBgMovieGenre(genreBg);
    }
  }
 

  const imageUrlStyle = {
    "--bg-image": appBg && appBg.backdrop_path ? `url(https://image.tmdb.org/t/p/original${appBg.backdrop_path})` : "",
  };

  return (
    <div className="Home w-full h-full">
      <div
        className="bg w-full h-screen bg-fixed bg-no-repeat bg-center bg-cover fixed z-[-15]"
        style={imageUrlStyle}
      ></div>
      <div className="main-container m-auto">
        <NavComponent></NavComponent>
        <div className="title-card-reviews flex justify-between p-[3.5rem] pt-[4rem]">
          <TitleCard
            movieTitle={appBg?.original_title}
            movieOverview={appBg?.overview}
            movieRating={appBg?.vote_average}
            movieGenres={appBg?.genre_ids}
          ></TitleCard>
          {appBg && appBg.id && <ReviewCard movieId={appBg.id} />}
        </div>
        <PopularCard></PopularCard>
        <NowPlayingCard></NowPlayingCard>
        <UpComingMoviesCard></UpComingMoviesCard>
      </div>
    </div>
  );
};
