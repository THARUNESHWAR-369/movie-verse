
import React from 'react'
import ImdbComponent from '../../imdbRatingComponent';
import GenreComponent from '../../generComponent';

function TitleCard() {
    return (
        <>
            {/* Movie Title */}
            <h1 className="text-white capitalize tracking-wider text-3xl item-center align-middle font-bold">Movie Title Movie Title Movie Title Movie Title Movie Title</h1>
            {/* Tagline */}
            <h3 className="text-white italic">Tag line Tag lineTag line Tag line Tag line</h3>
            {/* Genre */}
            <GenreComponent/>
            {/* IMDB Rating */}
            <ImdbComponent rating={'9.3'}/>
            {/* Go to movie search */}
            <span className="material-icons-outlined bg-gradient-to-t from-[#ed213a] to-[#93291e] w-fit text-white p-2 cursor-pointer rounded-full text-[1.2rem]">
                open_in_full
            </span>
        </>
    )
}

export default TitleCard;