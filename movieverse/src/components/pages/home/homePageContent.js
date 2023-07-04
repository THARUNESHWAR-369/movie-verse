import { FooterComponent } from "../../footerComponent/footerComponent";
import { NowPlayingCard } from "./nowPlayingCard";
import { PopularCard } from "./popularCard";
import { TitleCard } from "./titleCard";
import { UpComingMoviesCard } from "./upcomingMoviesCard";
import { ReviewCard } from "./reviewCard"; // Assuming ReviewCard component exists

export const HomePageContent = ({ appBg, appBgMovieGenre }) => {
  if (!appBg) {
    return null; // Return null or show a loading state if appBg is null
  }

  const { original_title, overview, vote_average } = appBg;

  return (
    <>
      <div className="title-card-reviews flex justify-between">
        <TitleCard
          movieTitle={original_title}
          movieOverview={overview}
          movieRating={vote_average}
          movieGenres={appBgMovieGenre}
        />
        {appBg.id && <ReviewCard movieId={appBg.id} />}
      </div>
      <PopularCard />
      <NowPlayingCard />
      <UpComingMoviesCard />
      <FooterComponent />
    </>
  );
};
