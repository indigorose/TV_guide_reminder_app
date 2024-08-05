import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card } from 'react-bootstrap';
import { fetchMovies, setQuery } from '../slices/moviesSlice'; // You need to create this slice
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';
const Hero = () => {
	const [query, setLocalQuery] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { movies, loading } = useSelector((state) => state.movies); // Assuming you have moviesSlice in the state

	const submitHandler = (e) => {
		e.preventDefault();
		if (query.trim()) {
			dispatch(setQuery(query));
			dispatch(fetchMovies(query));
			navigate(`/search`);
		} else {
			toast.error('Please enter a search query');
		}
	};

	return (
		<div className=" py-5">
			<Container className="d-flex justify-content-center">
				<Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
					<h1 className="text-center mb-4">My Media Watchlist</h1>
					<p className="text-center mb-3">
						Welcome to your own Media Watchlist, a place to store
						your &quot;I&apos;ll get round to it&quot; Movies and TV
						Shows.
						<br />
						Start now by searching below or log in to see your list.
					</p>

					<FormContainer>
						<h1>Search Movies</h1>
						{loading && <Loader />}
						<Form onSubmit={submitHandler}>
							<Form.Group controlId="query">
								<Form.Label>Search Query</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter movie name"
									value={query}
									onChange={(e) =>
										setLocalQuery(e.target.value)
									}
								/>
							</Form.Group>
							<Button
								type="submit"
								variant="primary"
								className="mt-3"
							>
								Search
							</Button>
						</Form>
					</FormContainer>
					<div className="d-flex mt-3">
						<LinkContainer to="/login">
							<Button variant="primary" className="me-3">
								Sign In
							</Button>
						</LinkContainer>
						<LinkContainer to="/register">
							<Button variant="secondary">Register</Button>
						</LinkContainer>
					</div>
				</Card>
			</Container>
		</div>
	);
};

export default Hero;
