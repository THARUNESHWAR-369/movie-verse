"use client";

import React from "react";
import Image from "next/image";
import { useRef } from "react";


function CastCarousel({ title, pn }) {
  const dummyMovieCarouselData: MovieCarouselData[] = [
    {
      movieName: "The Example Movie",
      releaseDate: new Date("2023-08-11"), // Replace with a valid date
      imdbRating: "7.5",
      posterUrl:
        "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
    },
    {
      movieName: "Another Movie",
      releaseDate: new Date("2022-05-20"), // Replace with a valid date
      imdbRating: "8.2",
      posterUrl:
        "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
    },
    {
      movieName: "Tyler Wise",
      releaseDate: new Date("11-04-2093"),
      imdbRating: "3",
      posterUrl:
        "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
    },
    {
      movieName: "Jane Berry",
      releaseDate: new Date("03-03-2090"),
      imdbRating: "9",
      posterUrl:
        "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
    },
    {
      movieName: "Susan Wilson",
      releaseDate: new Date("12-04-2037"),
      imdbRating: "7",
      posterUrl:
        "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
    },
    {
      movieName: "Zachary Jordan",
      releaseDate: new Date("05-09-2033"),
      imdbRating: "5",
      posterUrl:
        "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
    },
    {
      movieName: "Clara Armstrong",
      releaseDate: new Date("02-08-2053"),
      imdbRating: "3",
      posterUrl:
        "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
    },
    {
      movieName: "Theodore Harmon",
      releaseDate: new Date("06-05-2033"),
      imdbRating: "1",
      posterUrl:
        "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
    },
  ];
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);

  const handleLeftArrowClick = () => {
    if (leftArrowRef.current) {
      const cards = document.getElementsByClassName(pn)[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft -= 140;
    }
  };

  const handleRightArrowClick = () => {
    if (rightArrowRef.current) {
      const cards = document.getElementsByClassName(pn)[0];
      //console.log(cards.scrollLeft);
      cards.scrollLeft += 140;
    }
  };

  return (
    <section className="mt-2 h-full w-full">
      <div className="sized-container py-2 text-white w-full h-full relative">
        <h1 className="font-bold text-2xl tracking-wider">{title}</h1>
        <div className="flex absolute justify-between z-10 w-[100%] top-[55%]">
          <i
            ref={leftArrowRef}
            onClick={handleLeftArrowClick}
            className="bg-white/30 cursor-pointer absolute left-[-1rem] rounded-full flex justify-center items-center w-fit font-bold p-1 backdrop-blur-md hover:bg-white/70"
          >
            <span className="material-icons-outlined">chevron_left</span>
          </i>
          <i
            ref={rightArrowRef}
            onClick={handleRightArrowClick}
            className="bg-white/30 cursor-pointer absolute right-[-1rem] rounded-full flex justify-center items-center w-fit font-bold p-1 backdrop-blur-md hover:bg-white/70"
          >
            <span className="material-icons-outlined">chevron_right</span>
          </i>
        </div>
        <div className="w-full mt-2">
          <div
            className={`movie-cards ${pn} flex gap-2 flex-nowrap justify-start snap-mandatory snap-x scroll-smooth h-[293px] overflow-auto relative scrollbar-hide`}
          >
            {dummyMovieCarouselData.map((data, index) => (
              <div
                key={index}
                id="movie-card"
                className="movie-card shadow-lg rounded-md w-[190px] min-w-[190px] overflow-hidden transition-all snap-start scroll-ml-6 cursor-pointer"
              >
                <div className="w-full h-full relative">
                  <div className="rounded-lg shadow-xl w-[5rem] h-[5rem] absolute z-10 left-[25%] overflow-hidden">
                    <Image
                      className="rounded-lg bg-orange-500"
                      alt={data.movieName}
                      src={data.posterUrl}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className=" w-full h-full relative top-8 rounded-md bg-gradient-to-b from-[#ed213a] to-[#93291e]">
                    <div className="w-full h-full absolute top-[20%] p-2 text-sm flex gap-3 flex-col">
                      <span className="bg-black/50 gap-1 p-1 rounded-md text-center w-full flex-wrap line-clamp-3 flex flex-col">
                        <b>Name </b>
                        <p className="font-extralight text-ellipsis line-clamp-2 w-full text-xs">
                          MyName MyName MyName
                        </p>
                      </span>
                      <span className="bg-black/50 gap-1 overflow-auto p-1 rounded-md text-center w-full flex-wrap line-clamp-3 flex flex-col">
                        <b>Charcater Name </b>
                        <p className="font-extralight text-ellipsis line-clamp-2 w-full text-xs">
                          MyName MyName MyName
                        </p>
                      </span>
                      <button className="font-bold tracking-wider text-xs border-2 rounded-md p-1 hover:bg-white hover:text-[#a52723]">
                        Know More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CastCarousel;
