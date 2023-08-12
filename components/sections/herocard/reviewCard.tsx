
import Image from "next/image";
import React from "react";

function ReviewCard() {
  const reviewDatas : ReviewData[] =  [
    {
      picture:
        "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",
      username: "Fanny",
      uploaded: "1/10/2076",
      url: "http://nar.net/here",
      name: "Henry Schmidt"
    },
    {
      picture:
        "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",
      username: "Fannie",
      uploaded: "1/13/2090",
      url: "http://fag.eh/azuzi",
      name: "Tony Ramos"
    },
    {
      picture:
        "https://i.pinimg.com/564x/df/6e/c2/df6ec2f9e5297a01a0204d1a461f99de.jpg",
      username: "Floyd",
      uploaded: "1/26/2104",
      url: "http://vonoul.md/duhi",
      name: "Ora Byrd"
    },
    {
      picture:
        "https://image.tmdb.org/t/p/original/blEC280vq31MVaDcsWBXuGOsYnB.jpg",
      username: "Aaron",
      uploaded: "9/24/2101",
      url: "http://wemos.hu/pompaz",
      name: "Lewis Townsend"
    },
  ];

  return (
    <>
      <div className="w-full h-full">
        <h2 className="text-center font-bold text-white tracking-wider text-md">
          Movie Review
        </h2>
        <div className="w-full h-full p-2">
          <ul className="flex gap-2 flex-col">
            {
            reviewDatas.length > 0 ? (
                reviewDatas.map((reviewData, index) => (
                  <li key={index} className="backdrop-blur-md w-full max-w-md m-auto p-2 rounded-full cursor-pointer text-white bg-white/30 flex justify-between items-center">
                    <div className="rounded-full">
                      <Image
                        className="rounded-full"
                        src={reviewData.picture}
                        alt={reviewData.username}
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="w-full px-3">
                      <div>
                        <h4 className="font-bold">{reviewData.username}</h4>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <h6 className="italic text-sm font-extralight">@{reviewData.name}</h6>
                        </div>
                        <div>
                          <p className="italic text-xs font-extralight">{reviewData.uploaded}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
            ) : (
              <p className="font-bold tracking-wider text-red-600 text-center">No Reviews found</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ReviewCard;
