
import React from 'react'
import MovieCard from '../sections/movieCard'
import CastCarousel from '../carousel/castcarousel'

function MovieScreen() {
    return (
        <>
            {/* MovieCard */}
            <MovieCard />
            {/* Cast Carousel */}
            <CastCarousel title={'Casts'} pn={'cd'}/>
        </>
    )
}

export default MovieScreen