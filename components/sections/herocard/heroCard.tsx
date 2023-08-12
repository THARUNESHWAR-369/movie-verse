import ReviewCard from "./reviewCard";
import TitleCard from "./titleCard";

export default function HeroCard() {
    return (
        <div className="hero-card sized-container py-2">
            <div className="hero-card-container flex gap-5">
                <div className="hero-card-content w-3/5 max-w-xlg flex flex-col gap-4">
                   <TitleCard/>
                </div>
                <div className="hero-card-movie-review w-2/5">
                    <ReviewCard/>
                </div>
            </div>
        </div>
    );
}