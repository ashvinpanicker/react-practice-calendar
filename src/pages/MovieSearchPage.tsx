import React, { useState, useEffect } from 'react';
import { BackButton } from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';

// 1. Create Search and Button
// 2. When user searches term, fetch movies from API
// 3. Render movies in a grid
// 4. Use a custom hook to encapsulate the data fetching logic
// 5. Make sure the page fails gracefully if the API returns an error 

type Movie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

const moviesAPIURL = "https://api.themoviedb.org/3/search/movie";
const moviePosterImageURL = "https://image.tmdb.org/t/p/w500/";

export const MovieSearchPage: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const useMovieSearch = (searchTerm: string) => {
        const [loading, setLoading] = useState(false);
        const [movies, setMovies] = useState<Movie[]>([]);
        const [error, setError] = useState<string | null>(null);

        useEffect(() => {
            const fetchMovies = async () => {
                if (!searchTerm) return;
                try {
                    setLoading(true);
                    const response = await axios.get(moviesAPIURL, { params: { query: searchTerm, include_adult: true }, headers: { Authorization: `Bearer ${import.meta.env.VITE_MOVIE_API_KEY}` } });
                    setMovies(response.data.results);
                    setLoading(false);
                } catch (error) {
                    setError("Error fetching movies " + error);
                    setLoading(false);
                }
            }
            fetchMovies();
        }, [searchTerm]);

        return { loading, movies, error };
    };

    const { loading, movies, error } = useMovieSearch(searchTerm);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <BackButton />
                <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">Movie Search Page</h1>
                    <div className='flex flex-row'>
                        <input type="text" placeholder="Search for a movie..." className="w-full p-2 border rounded" onChange={(e) => setInputText(e.target.value)} />
                        <button className="bg-blue-500 text-white rounded p-2 ml-2" onClick={() => setSearchTerm(inputText)}>Search</button>
                    </div>
                    <div>
                        {loading ?
                            <Spinner />
                            :
                            error ?
                                <div className="text-red-600 text-sm mt-4">{error}</div>
                                :
                                movies.length === 0 ?
                                    <div className="text-gray-600 text-sm mt-4">No movies found</div>
                                    :
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
                                        {movies.map((movie: Movie) => (
                                            <div key={movie.id} className="text-gray-600 text-sm sm:text-base border p-2 flex flex-col justify-center">
                                                <b className='text-center'>{movie.title}</b>
                                                <img src={`${moviePosterImageURL}${movie.poster_path}`} alt={movie.title} className="w-full h-48 object-cover" />
                                            </div>
                                        ))}
                                    </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};