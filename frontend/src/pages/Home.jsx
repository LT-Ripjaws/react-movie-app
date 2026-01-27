import MovieCard from "../components/MovieCard";
import {useState} from  "react";

function Home() {

    const [searchQuery, setSearchQuery ] = useState("");

    const movies = [
        {id:1, title: 'Movie 1', release_date: "2023-01-01", poster: 'https://via.placeholder.com/150'},
        {id:2, title: 'Movie 2', release_date: "2023-02-01", poster: 'https://via.placeholder.com/150'},
        {id:3, title: 'Movie 3', release_date: "2023-03-01", poster: 'https://via.placeholder.com/150'},
    ]

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
    }
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search movies..." className="search-input"/>
                <button type="submit" className="search-btn">Search</button>
            </form>
            <div className ="movies-grid">
                {movies.map(movie => movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && <MovieCard key={movie.id} movieInfo={movie} />)}
            </div>

        </div>
    );
}

export default Home