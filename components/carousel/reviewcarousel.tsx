"use client";

import React from "react";
import Image from "next/image";
import { useRef } from "react";

function ReviewCarousel({pn = "movie-review-carousel-movie-page"}) {
  const reviews: ReviewData[] = [
    {
      picture:
        "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      username: "user1",
      uploaded: "2023-08-11",
      url: "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",
      name: "User One",
    },
    {
      picture:
        "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      username: "user2",
      uploaded: "2023-08-10",
      url: "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      name: "User Two",
    },
    {
      picture:
        "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      username: "user3",
      uploaded: "2023-08-09",
      url: "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      name: "User Three",
    },
    {
      picture:
        "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      username: "user1",
      uploaded: "2023-08-11",
      url: "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      name: "User One",
    },
    {
      picture:
        "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      username: "user2",
      uploaded: "2023-08-10",
      url: "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      name: "User Two",
    },
    {
      picture:
        "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      username: "user3",
      uploaded: "2023-08-09",
      url: "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",

      name: "User Three",
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
    <section className=" w-full h-full mt-4 text-white relative">
      <div className=" sized-container relative">
        <h1 className="font-bold text-2xl tracking-wider">Review</h1>
        <div className="bg-blue-400 absolute flex justify-between z-10 w-[100%] top-[48%]">
          <i
            ref={leftArrowRef}
            onClick={handleLeftArrowClick}
            className="bg-white/30 cursor-pointer rounded-full absolute left-[-1rem] flex justify-center items-center w-fit font-bold p-1 backdrop-blur-md hover:bg-white/70"
          >
            <span className="material-icons-outlined">chevron_left</span>
          </i>
          <i
            ref={rightArrowRef}
            onClick={handleRightArrowClick}
            className="bg-white/30 cursor-pointer rounded-full absolute right-[-1rem] flex justify-center items-center w-fit font-bold p-1 backdrop-blur-md hover:bg-white/70"
          >
            <span className="material-icons-outlined">chevron_right</span>
          </i>
        </div>
        <div className=" w-full mt-2">
          <div
            className={`movie-cards ${pn} flex gap-2 flex-nowrap justify-start snap-mandatory snap-x scroll-smooth h-[300px] overflow-auto relative scrollbar-hide`}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                id="movie-card"
                className="movie-card shadow-lg snap-start scroll-ml-6 review-card bg-gradient-to-b from-[#ed213a] to-[#93291e] rounded-md w-[500px] min-w-[20em] p-[0.6em] text-center sm:min-w-[16em] lg:min-w-[22em]"
              >
                <div className="bg-gradient-to-b  w-full h-full p-3 text-sm">
                  <div className="w-full flex item-center justify-center relative">
                    <div className="w-[5rem] h-[5rem] rounded-full">
                      <Image
                        className="rounded-full"
                        src={review.picture}
                        alt={review.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="absolute right-[-0.5rem] top-[-1rem]">
                      <span className="material-icons-outlined w-fit  text-black bg-white/30 backdrop-blur-md p-1 cursor-pointer rounded-full text-[1.2rem] hover:text-white">
                        open_in_full
                      </span>
                    </div>
                  </div>
                  <div className="h-[0.1rem] bg-[#ffffff2e] w-[100%] my-2"></div>
                  <h3 className="text-center font-bold tracking-widest">
                    {review.username}
                  </h3>
                  <div className="h-[0.1rem] bg-[#ffffff2e] w-[100%] my-2"></div>
                  <div className="py-[0.3em] text-justify overflow-hidden line-clamp-4">
                    <p className="h-[118px] w-full box-border tracking-wide">
                      jfkldjfkdjfkjd skldj dkfjdkj kjfdks jkdjfdsjdjkfj d
                      jfkldjfkdjfkjd skldj dkfjdkj kjfdks jkdjfdsjdjkfj d
                      jfkldjfkdjfkjd skldj dkfjdkj kjfdks jkdjfdsjdjkfj
                      djfkldjfkdjfkjd skldj dkfjdkj kjfdks jkdjfdsjdjkfj d
                    </p>
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

export default ReviewCarousel;
