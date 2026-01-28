import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({movieInfo}){
    const {isFavourite, addToFavourites, removeFromFavourites} = useMovieContext();
    
    function onFavouriteClick(e){
        e.preventDefault();
        if(isFavourite(movieInfo.id)){
            removeFromFavourites(movieInfo.id);
        } else {
            addToFavourites(movieInfo);
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img 
                    src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`} 
                    alt={movieInfo.title}
                    loading="lazy"
                />
                <div className="movie-overlay">
                    <button 
                        className={`favourite-btn ${isFavourite(movieInfo.id) ? "active" : ""}`} 
                        onClick={onFavouriteClick}
                        aria-label={isFavourite(movieInfo.id) ? "Remove from favourites" : "Add to favourites"}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill={isFavourite(movieInfo.id) ? "currentColor" : "none"}
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movieInfo.title}</h3>
                <p className="movie-overview">{movieInfo.overview}</p>
                <div className="movie-meta">
                    <div className="meta-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>{formatDate(movieInfo.release_date)}</span>
                    </div>
                    <div className="meta-item rating">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span>{(movieInfo.vote_average).toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;