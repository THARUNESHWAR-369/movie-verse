import React, { useEffect, useState} from 'react';


export const HomePage = () => {

    const [appBg, setAppBg] = useState([]);

    useEffect(()=>{fetchNowPlayingMovieData();},[]);

    const fetchNowPlayingMovieData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_SERVICE_GET_NOW_PLAYING_MOVIE_URL);
            const jsonData = await response.json();
            console.log(jsonData);
        }
        catch(error) {
            console.log("error fetching data: ",error);
        }
    };

    return (
        <div className="Home">
            <div className='bg'></div>
        </div>
    );
}