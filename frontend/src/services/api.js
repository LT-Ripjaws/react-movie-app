const API_KEY = "" // Add api key here for it to work.
const BASE_URL = "https://api.themoviedb.org/3"

export const getPopularMovies = async (pageCount = 5) => {
    try {
        // Create an array of promises for multiple pages
        const pagePromises = [];
        
        for (let page = 1; page <= pageCount; page++) {
            pagePromises.push(
                fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`)
                    .then(response => response.json())
            );
        }
        
        // Wait for all requests to complete
        const responses = await Promise.all(pagePromises);
        
        // Combine all results into a single array
        const allMovies = responses.flatMap(data => data.results || []);
        
        return allMovies;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

export const searchMovies = async (query, pageCount = 5) => {
    try {
        // Create an array of promises for multiple pages
        const pagePromises = [];
        
        for (let page = 1; page <= pageCount; page++) {
            pagePromises.push(
                fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`)
                    .then(response => response.json())
            );
        }
        
        // Wait for all requests to complete
        const responses = await Promise.all(pagePromises);
        
        // Combine all results into a single array
        const allMovies = responses.flatMap(data => data.results || []);
        
        return allMovies;
    } catch (error) {
        console.error('Error searching movies:', error);
        throw error;
    }
};