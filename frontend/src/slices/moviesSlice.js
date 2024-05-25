import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk(
	'movies/fetchMovies',
	async (query) => {
		const response = await axios.get(`/api/movies?query=${query}`);
		return response.data.results;
	}
);

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovies.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.loading = false;
				state.movies = action.payload;
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export default moviesSlice.reducer;
