'use client';

import Image from "next/image";
import { useRef } from "react";
import ImdbRatingComponent from "../imdbRatingComponent";

const MovieCarousel = ({ title, pn }) => {
    const dummyMovieCarouselData: MovieCarouselData[] = [
        {
            movieName: "The Example Movie",
            releaseDate: new Date("2023-08-11"), // Replace with a valid date
            imdbRating: "7.5",
            posterUrl: "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
        },
        {
            movieName: "Another Movie",
            releaseDate: new Date("2022-05-20"), // Replace with a valid date
            imdbRating: "8.2",
            posterUrl: "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
        },
        {
            movieName: "Tyler Wise",
            releaseDate: new Date("11-04-2093"),
            imdbRating: "3",
            posterUrl: "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
        },
        {
            movieName: "Jane Berry",
            releaseDate: new Date("03-03-2090"),
            imdbRating: "9",
            posterUrl: "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
        },
        {
            movieName: "Susan Wilson",
            releaseDate: new Date("12-04-2037"),
            imdbRating: "7",
            posterUrl: "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
        },
        {
            movieName: "Zachary Jordan",
            releaseDate: new Date("05-09-2033"),
            imdbRating: "5",
            posterUrl: "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
        },
        {
            movieName: "Clara Armstrong",
            releaseDate: new Date("02-08-2053"),
            imdbRating: "3",
            posterUrl: "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
        },
        {
            movieName: "Theodore Harmon",
            releaseDate: new Date("06-05-2033"),
            imdbRating: "1",
            posterUrl: "https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/kD35dB3KOHrLo1Y3RU5xXJ1hI7.jpg",
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
                <div className="flex absolute justify-between z-10 w-[100%] top-[48%]">
                    <i ref={leftArrowRef} onClick={handleLeftArrowClick}
                        className="bg-white/30 cursor-pointer absolute left-[-1rem] rounded-full flex justify-center items-center w-fit font-bold p-1 backdrop-blur-md hover:bg-white/70">
                        <span className="material-icons-outlined">
                            chevron_left
                        </span>
                    </i>
                    <i ref={rightArrowRef} onClick={handleRightArrowClick}
                        className="bg-white/30 cursor-pointer absolute right-[-1rem] rounded-full flex justify-center items-center w-fit font-bold p-1 backdrop-blur-md hover:bg-white/70">
                        <span className="material-icons-outlined">
                            chevron_right
                        </span>
                    </i>
                </div>
                <div className="w-full mt-2">
                    <div className={`movie-cards ${pn} flex gap-2 flex-nowrap justify-start snap-mandatory snap-x scroll-smooth h-[270px] overflow-auto relative whitespace-nowrap scrollbar-hide`}>
                        {dummyMovieCarouselData.map((movieData, index) => (
                            <div key={index} id="movie-card" className="movie-card rounded-md w-[165px] h-[249px] min-w-[165px] overflow-hidden transition-all snap-start scroll-ml-6 cursor-pointer">
                                <div className="overflow-hidden relative movie-card-container">
                                    <div className="movie-card-content w-full h-full bg-gradient-to-t from-[#ed213a] to-[#93291e] rounded-md">
                                        <Image
                                            id="movie-card-img"
                                            className="movie-card-img rounded-md w-full h-full aspect-[10.5/16] hover:opacity-5"
                                            src={movieData.posterUrl}
                                            alt={movieData.movieName}
                                            width={100}
                                            height={100}
                                        />
                                        <div id="movie-card-details" className="movie-card-details absolute top-0 w-full h-full opacity-0">
                                            <span className=" w-full scale-75 absolute top-10 bg-black/50 p-2 rounded-lg text-center items-center justify-center align-middle flex">
                                                <ImdbRatingComponent rating={movieData.imdbRating} />
                                            </span>

                                            <span className=" w-full scale-75 absolute bottom-4 bg-black/50 p-2 rounded-lg text-center items-center justify-center align-middle flex">
                                                <p className="font-bold tracking-widest">{movieData.releaseDate.toLocaleDateString()}</p>
                                            </span>
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

export default MovieCarousel;