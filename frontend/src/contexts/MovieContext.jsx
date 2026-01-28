import {createContext, useState, useEffect, useContext} from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {

    const [favourites, setFavourites] = useState([]);

    useEffect( () => {
        const storedFavs = localStorage.getItem("favouriteMovies");

        if(storedFavs) setFavourites(JSON.parse(storedFavs));
    }, []);

    useEffect( () => {
        localStorage.setItem("favouriteMovies", JSON.stringify(favourites));
    }, [favourites]);

    const addToFavourites = (movie) => {
        if(!isFavourite(movie.id)){
            setFavourites(prev => [...prev, movie]);
        }
    }

    const removeFromFavourites = (movieId) => {
        setFavourites( prev => prev.filter( fav => fav.id !== movieId ));
    }

    const isFavourite = (movieId) => {
        return favourites.some( movie => movie.id === movieId );
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}