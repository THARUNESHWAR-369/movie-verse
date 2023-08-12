

import React from 'react'
import MovieCarousel from '../carousel/moviecarousel'
import HeroCard from '../sections/herocard/heroCard'

function LandingScreen() {
    return (
        <>
            {/* Hero Card */}
            < HeroCard />
            {/* Popular Movie Carousel */}
            < MovieCarousel title="Popular Movies" pn={'pm'} />
            {/* Now Playing Movie Carousel */}
            < MovieCarousel title="Now Playing" pn={'np'} />
            {/* Upcoming Movies Movie Carousel */}
            < MovieCarousel title="Upcoming Movies" pn={'up'} />
        </>
  )
}

export default LandingScreen