
function MovieCard({movieInfo}){

    function onFavouriteClick(){
        console.log("Favourite clicked for movie:", movieInfo.title);
    }

    return(
        <div className="movie-card">
            <div className="movie-poster">
                <img src={movieInfo.poster} alt={movieInfo.title} />
                <div className="movie-overlay">
                    <button className="favourite-btn" onClick={onFavouriteClick}>🤍</button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movieInfo.title}</h3>
                <p>Release-Date: {movieInfo.release_date}</p>
            </div>
        </div>
        
    );
}

export default MovieCard;