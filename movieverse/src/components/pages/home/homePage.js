import React, { useEffect, useState } from "react";

export const HomePage = () => {
  const [appBg, setAppBg] = useState([]);

  useEffect(() => {
    fetchNowPlayingMovieData();
  }, []);

  const fetchNowPlayingMovieData = async () => {
    fetch(process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL, {
        headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      })
      .then((response) => response.json().then((jsonData) => {
        setAppBg(jsonData);
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
