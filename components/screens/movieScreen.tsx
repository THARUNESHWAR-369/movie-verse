
import React from 'react'
import MovieCard from '../sections/movieCard'
import CastCarousel from '../carousel/castcarousel'
import ReviewCarousel from '../carousel/reviewcarousel'

function MovieScreen() {
    return (
        <>
            {/* MovieCard */}
            <MovieCard />
            {/* Cast Carousel */}
            <CastCarousel title={'Casts'} pn={'cd'}/>
            {/* Review card */}
            <ReviewCarousel/>
        </>
    )
}

export default MovieScreen