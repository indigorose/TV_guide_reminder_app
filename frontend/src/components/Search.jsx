
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, Card} from 'react-bootstrap';
import { fetchMovies } from '../slices/moviesSlice'; // You need to create this slice
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';

const Search = () => {
    const { movies, loading, } = useSelector((state) => state.movies); // Assuming you have moviesSlice in the state
return (
<div className="container">
    {movies && movies.length > 0 && (
    <Row className="mt-3">
    {movies.map((movie) => (
        <Col key={movie.id} sm={12} md={6} lg={4} xl={3}>
        <Link to={`/movie/${movie.id}`}>
            <Card>
            <Card.Img src={movie.poster_path} variant="top" />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
            </Card.Body>
            </Card>
        </Link>
        </Col>
    ))}
    </Row>
)}
</div>

)}

export default Search