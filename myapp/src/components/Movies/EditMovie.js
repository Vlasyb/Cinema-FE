import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { TextField, Typography, Button, Container } from "@mui/material"
import { useSelector } from "react-redux"

export const EditMovie = () => {
	const movies = useSelector((state) => state.movies) || []
	const [currMovie, setCurrMovie] = useState({})
	const { id: movieId } = useParams()

	const [name, setName] = useState(currMovie.name || "")
	const [genres, setGenres] = useState(currMovie.genres || [])
	const [image, setImage] = useState(currMovie.image || "")
	const [premiered, setPremiered] = useState(currMovie.premiered || "")

	const handleSave = () => {
		// Create the updated movie object and call the onSave function
		const updatedMovie = {
			...currMovie,
			name,
			genres,
			image,
			premiered,
		}
		// onSave(updatedMovie);
	}

	useEffect(() => {
		movies.then((movies) => {
			if (Array.isArray(movies) && movies.length !== 0) {
				const foundMovie = movies.find((movie) => movie._id === movieId)
				if (foundMovie) {
					setCurrMovie(foundMovie)
				} else {
					// Handle case when movie is not found
					console.log("Movie not found")
				}
			}
			console.log("CURRENT MOVIE:", currMovie)
		})
	}, [movies, movieId, currMovie])

	return (
		<div>
			<Typography
				variant="h4"
				color="initial"
				sx={{ textAlign: "center", mb: "2em", mt: "3.5em" }}
			>
				Edit Movie: {currMovie.name}
			</Typography>
			<Container
				maxWidth="sm"
				sx={{
					border: "1px solid #008080",
					":hover": {
						border: "2px solid #008080",
					},
					borderRadius: 4,
					boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
					padding: 2,
					borderRadius: 1,
					backgroundColor: "#f0f0f0",
					"& .MuiTextField-root": {
						marginBottom: 2,
					},
					"& .button-group": {
						display: "flex",
						justifyContent: "flex-end",
						marginTop: 2,
					},
					"& .cancel-button": {
						marginRight: 2,
					},
				}}
			>
				<Typography
					variant="h5"
					gutterBottom
					sx={{ textAlign: "center", color: "#008080" }}
				>
					Edit Movie
				</Typography>
				<TextField
					label="Name"
					onChange={(e) => setName(e.target.value)}
					InputProps={{
						placeholder: `Enter Name, current: ${currMovie.name}`,
					}}
					fullWidth
				/>
				<TextField
					label="Genres"
					onChange={(e) => setGenres(e.target.value.split(","))}
					InputProps={{
						placeholder: `Enter Genres (comma-separated), current: ${currMovie.genres?.join(
							","
						)}`,
					}}
					fullWidth
				/>
				<TextField
					label="Image URL"
					onChange={(e) => setImage(e.target.value)}
					InputProps={{
						placeholder: `Enter Image URL, current: ${currMovie.image}`,
					}}
					fullWidth
				/>
				<TextField
					label="Premiered"
					onChange={(e) => setPremiered(e.target.value)}
					InputProps={{
						placeholder: `Enter Premiered, current: ${currMovie.premiered}`,
					}}
					fullWidth
				/>
				<div className="button-group">
					<Button
						variant="outlined"
						component={Link}
						to={`/movies`}
						className="cancel-button"
						sx={{
							color: "#008080",
							borderColor: "#008080",
							"&:hover": {
								borderColor: "#006666",
								backgroundColor: "transparent",
							},
						}}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSave}
						sx={{
							backgroundColor: "#008080",
							"&:hover": {
								backgroundColor: "#006666",
							},
						}}
					>
						Update
					</Button>
				</div>
			</Container>
		</div>
	)
}
