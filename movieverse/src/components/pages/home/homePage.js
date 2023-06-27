import React, { useEffect, useState } from "react";
import LazyImage from "../../LazyImage/lazyImage";
import { NavComponent } from "../../navigation/navComponent";
import { TitleCard } from "./titleCard";


export const HomePage = () => {

    console.log(process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL)
  const [appBg, setAppBg] = useState(null);

  useEffect(() => {
    fetchNowPlayingMovieData();
  }, []);


  const fetchNowPlayingMovieData = async () => {
    fetch(process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL)
      .then((response) => response.json().then((jsonData) => {
        console.log(jsonData)
        setAppBg(jsonData);
      })
      .catch((error) => {
        console.log("error fetching data: ", error);
      }));
      
  };

  //const imageUrl = 'https://image.tmdb.org/t/p/original/e2Jd0sYMCe6qvMbswGQbM0Mzxt0.jpg';
console.log(appBg)
  const imageUrlStyle = {
    '--bg-image': `url(${appBg[4]})`,
  };

  return (
    <div className="Home">
      <div className="bg w-full h-screen bg-fixed bg-no-repeat bg-center bg-cover relative" style={imageUrlStyle}>
        <NavComponent></NavComponent>
        <div className="title-card-reviews">
          <TitleCard></TitleCard>
          <div></div>
        </div>
      </div>
    </div>
  );
};
