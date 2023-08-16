import { useState, useEffect } from "react"
import {
	TextField,
	Typography,
	Button,
	Box,
	Container,
	Grid,
} from "@mui/material"
import { Movie } from "./Movie"
import axios from "axios"

export const AllMovies = ({ moviesPromise, showMovieId }) => {
	const [movies, setMovies] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	const [searchedMovieFromParams, setSearchedMovieFromParams] = useState(false)
	const port = 8040

	const handleSearch = () => {
		if (searchTerm != "") {
			axios
				.get(`http://localhost:${port}/movies/findmovie/${searchTerm}`, {
					withCredentials: true,
				})
				.then((response) => {
					setMovies(response?.data)
				})
				.catch((error) => {
					// Handle errors if any
					console.error("Error fetching filtered movies:", error)
				})
		}
	}

	//understand how the promise works
	useEffect(() => {
		const fetchMovies = async () => {
			moviesPromise?.then((resolvedMovies) => {
				setMovies(resolvedMovies)
			})
		}
		if (moviesPromise) {
			fetchMovies()
		}
	}, [moviesPromise])

	useEffect(() => {
		const getMovie = async () => {
			if (showMovieId) {
				try {
					const { data: movie } = await axios.get(
						`http://localhost:${port}/movies/movie/${showMovieId}`,
						{ withCredentials: true }
					)
					setSearchedMovieFromParams(true)
					setSearchTerm(movie.name)
				} catch (error) {
					console.error("Error fetching movie:", error)
				}
			}
		}

		getMovie()
	}, [showMovieId])

	useEffect(() => {
		console.log(searchedMovieFromParams)
		if (showMovieId && searchedMovieFromParams) {
			console.log("from inside")
			handleSearch()
			setSearchedMovieFromParams(false)
		}
	}, [searchTerm])

	return (
		<div>
			<Container
				maxWidth="sm"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center", // Center the container horizontally
				}}
			>
				<Typography
					sx={{ mt: 3, mb: 3, textAlign: "center" }}
					variant="h3"
					color="initial"
				>
					Matched Movies
				</Typography>

				{/* Search input and button */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						marginBottom: "1.5em", // Add some bottom margin for spacing
					}}
				>
					<TextField
						label="Find movie"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						sx={{
							// what is inside the input
							"& .MuiInputBase-input": {
								fontFamily: "poppins",
								fontSize: "16px",
								color: "#008080",
							},
						}}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSearch}
						sx={{
							marginLeft: "1em", // Add some left margin for spacing
							padding: "12px 24px",
							backgroundColor: "#008080",
							"&:hover": {
								backgroundColor: "#006666",
							},
						}}
					>
						Find
					</Button>
				</Box>
			</Container>
			<Grid
				container
				spacing={3}
				sx={{ paddingLeft: "10%", paddingRight: "10%" }}
			>
				{movies.map((movie) => (
					<Grid item xs={12} sm={6} md={4} key={movie._id}>
						<Movie movie={movie} />
					</Grid>
				))}
			</Grid>
		</div>
	)
}
