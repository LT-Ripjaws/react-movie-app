import MovieCard from "../components/MovieCard";
import {useState, useEffect} from  "react";
import "../css/Home.css";

import { searchMovies, getPopularMovies } from "../services/api";

function Home() {

    const [searchQuery, setSearchQuery ] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try{
                // Fetch 5 pages of popular movies (about 100 movies)
                const popularMovies = await getPopularMovies(5);
                setMovies(popularMovies); 
            }
            catch (error){
                console.error("Error fetching popular movies:", error);
                setError("Failed to load popular movies. Please try again later.");
            }
            finally{
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            // Fetch 5 pages of search results
            const searchResults = await searchMovies(searchQuery, 5)
            setMovies(searchResults);
            setError(null);
        }
        catch(error){
            setError("Failed to search movies. Please try again later.");
            console.error("Error searching movies:", error);
        }
        finally{
            setLoading(false);
        }
    }

    const filteredMovies = searchQuery.trim() 
        ? movies.filter(movie => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()))
        : movies;

    return (
        <div className="home">
            <div className="hero-section">
                <h1 className="hero-title">Discover Movies</h1>
                <p className="hero-subtitle">Explore thousands of movies and find your next favorite</p>
                
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-container">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <input 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            type="text" 
                            placeholder="Search for movies..." 
                            className="search-input"
                        />
                        {searchQuery && (
                            <button 
                                type="button" 
                                onClick={() => setSearchQuery("")}
                                className="clear-btn"
                                aria-label="Clear search"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        )}
                    </div>
                    <button type="submit" className="search-btn">Search</button>
                </form>
            </div>

            <div className="content-section">
                {error && (
                    <div className="error-message">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading movies...</p>
                    </div>
                ) : (
                    <>
                        {filteredMovies.length > 0 ? (
                            <>
                                <div className="results-header">
                                    <h2>{searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}</h2>
                                    <span className="results-count">{filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}</span>
                                </div>
                                <div className="movies-grid">
                                    {filteredMovies.map(movie => (
                                        <MovieCard key={movie.id} movieInfo={movie} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="no-results">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                                <h3>No movies found</h3>
                                <p>Try adjusting your search or browse popular movies</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Home