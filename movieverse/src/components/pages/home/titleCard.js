
export const TitleCard = ({movieTitle, movieOverview, movieGenres, movieRating}) => {
  return (
    <div className="title-card text-white flex flex-col gap-4 w-[120%]">
      <h1 className="text-6xl tracking-wide font-bold">{movieTitle}</h1>
      <p className="w-[40%] ">
        {movieOverview}
      </p>
      <div className="title-card-genre flex gap-1">
        <ul className="flex gap-3">
        {movieGenres && movieGenres.map((genre, index) => (
            <li key={index} className="title-card-genre-li">{genre}</li>
          ))}
        </ul>
      </div>
      <span className="title-card-rating flex font-extrabold">
        <p className="bg-yellow-300 text-black p-[0.3rem] rounded-sm font-medium">IMDB</p>
        <p>&#9733;</p>
        <p> {movieRating}/10</p>
      </span>
      <button type="submit" className="title-card-external-link-btn w-fit"><i className="fa fa-external-link"></i></button>
    </div>
  );
};
