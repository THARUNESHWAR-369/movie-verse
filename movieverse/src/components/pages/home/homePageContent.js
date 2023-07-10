import { FooterComponent } from "../../footerComponent/footerComponent";
import { NowPlayingCard } from "./nowPlayingCard";
import { PopularCard } from "./popularCard";
import { TitleCard } from "./titleCard";
import { UpComingMoviesCard } from "./upcomingMoviesCard";
import { ReviewCard } from "./reviewCard"; 
import React, { useEffect, useState, useRef } from "react";
// Assuming ReviewCard component exists

export const HomePageContent = ({ appBg, appBgMovieGenre, titleCardMovie, cardMovie }) => {
  if (!appBg) {
    return null; // Return null or show a loading state if appBg is null
  }

  const { original_title, overview, vote_average } = appBg;

  const handleTitleCardMovie = (movie) => {
    titleCardMovie(movie);
  };

  const handleCardMovie = (movie) => {
    cardMovie(movie);
  };

  return (
    <>
      <div className="title-card-reviews flex justify-between">
        <TitleCard
          movieTitle={original_title}
          movieOverview={overview}
          movieRating={vote_average}
          movieGenres={appBgMovieGenre}
          titleCardMovieClick={handleTitleCardMovie}
        />
        {appBg.id && <ReviewCard movieId={appBg.id} />}
      </div>
      <PopularCard CardMovieClick={handleCardMovie} />
      <NowPlayingCard CardMovieClick={handleCardMovie} />
      <UpComingMoviesCard CardMovieClick={handleCardMovie}/>
      <FooterComponent></FooterComponent> 
    </>
  );
};
