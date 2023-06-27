import imdbLogo from "../../../static/images/imdb.png";

export const TitleCard = ({movieTitle, movieOverview, movieGenre, movieRating}) => {
  return (
    <div className="title-card text-white flex flex-col gap-4">
      <h1 className="text-6xl tracking-wide font-bold">{movieTitle}</h1>
      <p className="w-[40%] ">
        {movieOverview}
      </p>
      <div className="title-card-genre flex gap-1">
        <ul className="flex gap-3">
          <li className="title-card-genre-li">Comedy</li>
          <li className="title-card-genre-li">Action</li>
          <li className="title-card-genre-li">Horror</li>
        </ul>
      </div>
      <span className="title-card-rating">
        <img
          src={imdbLogo}
          alt="IMDb"
        /> <p>&#9733;</p>
        <p> 5.5/10</p>
      </span>
    </div>
  );
};
