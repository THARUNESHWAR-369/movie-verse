import React from "react";

function ImdbRatingComponent({
  rating = "",
  smallText = false,
}: ImdbRatingProps) {
  return (
    <div>
      <div
        className={`flex align-middle text-center items-center text-white gap-2 font-bold ${
          smallText ? "text-sm" : ""
        }`}
      >
        <span className="text-black font-bold bg-yellow-400 p-1 rounded-[0.15rem] tracking-wider">
          IMDB
        </span>
        <p>&#9733;</p>
        <p>{rating}/10</p>
      </div>
    </div>
  );
}

export default ImdbRatingComponent;
