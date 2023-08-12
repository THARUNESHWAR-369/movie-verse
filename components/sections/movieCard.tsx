import Image from "next/image";
import React from "react";
import GenreComponent from "../generComponent";
import ImdbRatingComponent from "../imdbRatingComponent";

function MovieCard() {
  return (
    <section className="mt-5">
      <div className="sized-container py-3">
        <div className="movie-screen-title-card flex justify-between gap-1 w-full h-full">
          <div className="w-[40rem] max-w-[20rem]">
            <div className="w-full h-full rounded-md shadow-md">
              <Image
                className="h-full w-full rounded-md"
                alt={"img"}
                src="https://image.tmdb.org/t/p/originalhttps://image.tmdb.org/t/p/original/ueO9MYIOHO7M1PiMUeX74uf8fB9.jpg"
                width={100}
                height={100}
              />
            </div>
          </div>
          <div>
            <div className="pl-6 text-white flex flex-col gap-2">
              <h1 className=" font-bold capitalize tracking-wider text-[2.1rem] text-center">
                Movie Title Movie Title Movie Title Movie
              </h1>
              <h3 className="italic font-extralight text-center">
                Tagline Tagline Tagline Tagline
              </h3>
              <p className="font-medium tracking-wider">
                Overview Overview Overview Overview Overview Overview
                OverviewOverview Overview Overview Overview
              </p>
              <div className="py-2 w-full items-center flex justify-center">
                <GenreComponent />
              </div>
              <div className="flex gap-2 flex-col">
                <h5 className="flex  gap-2 tracking-wider">
                  <b className="font-bolder">Release Date: </b>{" "}
                  <p>2023-07-28</p>
                </h5>
                <h5 className="flex  gap-2 tracking-wider">
                  <b className="font-bolder">Original language: </b>{" "}
                  <p>japanese</p>
                </h5>

                <div className=" flex text-start">
                  <ImdbRatingComponent rating={"8.4"} smallText={true} />
                </div>
                <h5 className="flex  gap-2 tracking-wider">
                  <b className="font-bolder">Budget: </b> <p>$0</p>
                </h5>
                <h5 className="flex  gap-2 tracking-wider">
                  <b className="font-bolder">Revenue: </b> <p>$0</p>
                </h5>
                <h5 className="flex  gap-2 tracking-wider">
                  <b className="font-bolder">Runtime: </b> <p>2h 58min</p>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieCard;
