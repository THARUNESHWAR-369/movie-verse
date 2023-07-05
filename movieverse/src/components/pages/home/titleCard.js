


export const TitleCard = ({movieTitle, movieOverview, movieGenres, movieRating, titleCardMovieClick}) => {
  const handleMovieClick = (movie) => {

    titleCardMovieClick(movie);
  };

  return (
    <div className="title-card text-white flex flex-col gap-4">
      <div className="w-[100%] flex align-middle items-center justify-center">
      <h1 className="text-6xl tracking-wide font-bold">{movieTitle}</h1>
      </div>
      <p className="title-card-overview w-[70%] text-justify">
        {movieOverview}
      </p>
      <div className="title-card-genre flex gap-1">
        <ul className="flex gap-3">
        {movieGenres && movieGenres.map((genre, index) => (
            <li key={index} className="title-card-genre-li">{genre}</li>
          ))}
        </ul>
      </div>
      <span className="title-card-rating flex font-extrabold py-[0.8rem]">
        <p className="bg-yellow-300 text-black p-[0.1rem] pl-2 pr-2 rounded-sm font-bold">IMDB</p>
        <p>&#9733;</p>
        <p className="text-sm">{movieRating}/10</p>
      </span>
      <button type="submit"   onClick={() => handleMovieClick(movieTitle)}
 className="title-card-external-link-btn w-fit"><i className="fa fa-external-link"></i></button>
    </div>
  );
};
