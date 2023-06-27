import React, { useEffect, useState } from "react";

export const HomePage = () => {

    console.log(process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL)
  const [appBg, setAppBg] = useState({});

  useEffect(() => {
    fetchNowPlayingMovieData();
  }, {});


  const fetchNowPlayingMovieData = async () => {
    fetch(process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL)
      .then((response) => response.json().then((jsonData) => {
        console.log(jsonData)
        setAppBg(jsonData['results']);
      })
      .catch((error) => {
        console.log("error fetching data: ", error);
      }));
      
  };

  return (
    <div className="Home">
      <div className="bg">{appBg}</div>
    </div>
  );
};
