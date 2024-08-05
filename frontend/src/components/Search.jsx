import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { fetchMovies } from '../slices/moviesSlice'; // You need to create this slice
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';

const Search = () => {
	const results = useSelector((state) => state.movies.results);
	const status = useSelector((state) => state.movies.status);
	const error = useSelector((state) => state.movies.error);

	console.log('Search results:', results); // Log the search results
	console.log('Search status:', status); // Log the search status
	console.log('Search error:', error); // Log any errors

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status === 'failed') {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="search-results">
			{results.length > 0 ? (
				results.map((movie) => (
					<div key={movie.id} className="movie">
						<h2>{movie.title}</h2>
						<p>{movie.overview}</p>
						<img
							src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
							alt={movie.title}
						/>
					</div>
				))
			) : (
				<p>No results found</p>
			)}
		</div>
	);
};

export default Search;
