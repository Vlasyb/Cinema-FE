import { useState, useEffect } from "react"
import { TextField, Typography, Button, Box, Container } from "@mui/material"
import { Movie } from "./Movie"
import axios from "axios"

export const AllMovies = ({ moviesPromise, showMovieId }) => {
	const [movies, setMovies] = useState([])
	const [searchTerm, setSearchTerm] = useState("")
	const port = 8040

	const handleSearch = () => {
		if (searchTerm != "") {
			axios
				.get(`http://localhost:${port}/movies/findmovie/${searchTerm}`, {
					withCredentials: true,
				})
				.then((response) => {
					setMovies(response.data)
				})
				.catch((error) => {
					// Handle errors if any
					console.error("Error fetching filtered movies:", error)
				})
		}
	}

	//understand how the promise works
	useEffect(() => {
		moviesPromise.then((resolvedMovies) => {
			setMovies(resolvedMovies)
		})
	}, [moviesPromise])

	useEffect(() => {
		// console.log("movie id is ", showMovieId)
		const getMovie = async () => {
			if (showMovieId) {
				try {
					const { data: movie } = await axios.get(
						`http://localhost:${port}/movies/movie/${showMovieId}`,
						{ withCredentials: true }
					)
					setSearchTerm(movie.name)

					setTimeout(() => {
						handleSearch()
					}, 1500)
				} catch (error) {
					console.error("Error fetching movie:", error)
				}
			}
		}

		getMovie()
	}, [showMovieId])

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

				{movies.map((movie) => {
					return <Movie movie={movie} key={movie._id} />
				})}
			</Container>
		</div>
	)
}
