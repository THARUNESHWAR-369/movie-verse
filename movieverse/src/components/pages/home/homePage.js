import React, { useEffect, useState} from 'react';


export const HomePage = () => {

    const [appBg, setAppBg] = useState([]);

    useEffect(()=>{fetchNowPlayingMovieData();},[]);

    const fetchNowPlayingMovieData = async () => {
        try {
            const response = await fetch('')
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