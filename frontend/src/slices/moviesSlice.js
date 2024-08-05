import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// TODO how to add API key
// const API_KEY = process.env.MOVIEDB_API_KEY;
// console.log(API_KEY);

export const fetchMovies = createAsyncThunk(
	'movies/fetchMovies',
	async (query, { rejectWithValue }) => {
		console.log(query);
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/search/movie?api_key=&query=${query}`
			);
			console.log('API Response:', response.data.results); // Log the API response
			return response.data.results;
		} catch (error) {
			console.error(error);
			return rejectWithValue(error.response.data);
		}
	}
);
const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		query: '',
		results: [],
		status: 'idle',
		error: null,
	},
	reducers: {
		setQuery: (state, action) => {
			state.query = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.results = action.payload;
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});
export const { setQuery } = moviesSlice.actions;

export default moviesSlice.reducer;
