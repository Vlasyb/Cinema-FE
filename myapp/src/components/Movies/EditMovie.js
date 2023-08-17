import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { TextField, Typography, Button, Container } from "@mui/material"
import { useSelector } from "react-redux"
import { Success } from "../Success"
import { Error } from "../Error"
import axios from "axios"

export const EditMovie = () => {
	const port = 8040

	const movies = useSelector((state) => state.movies) || []
	const [currMovie, setCurrMovie] = useState({})
	const { id: movieId } = useParams()

	const [name, setName] = useState(currMovie.name || "")
	const [genres, setGenres] = useState(currMovie.genres || [])
	const [image, setImage] = useState(currMovie.image || "")
	const [premiered, setPremiered] = useState(currMovie.premiered || "")

	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const handleUpdate = async (e) => {
		e.preventDefault()
		// Create the updated user object and call the onSave function
		const updatedMovie = {
			name: name == "" ? currMovie.name : name,
			premiered: premiered == "" ? currMovie.premiered : premiered,
			image: image == "" ? currMovie.image : image,
			genres,
		}
		try {
			const { data: res } = await axios.put(
				`http://localhost:${port}/movies/${currMovie._id}`,
				updatedMovie,
				{ withCredentials: true }
			)
			console.log("SAVING ", res)
			setName("")
			setPremiered("")
			setImage("")
			setGenres("")
			// dispatch("LOAD_USERS")
			setMessage(res)
			setTimeout(() => {
				setMessage("")
			}, 2500)
		} catch (err) {
			setErrorMessage(err)
			setTimeout(() => {
				setErrorMessage("")
			}, 2500)
			console.error("err ", err)
		}
	}

	useEffect(() => {
		try {
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
		} catch (error) {
			console.log("Haven't resolved promise yet:", error)
		}
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
					value={name}
					label="Name"
					onChange={(e) => setName(e.target.value)}
					InputProps={{
						placeholder: `Enter Name, current: ${currMovie.name}`,
					}}
					fullWidth
				/>
				<TextField
					value={genres}
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
					value={image}
					label="Image URL"
					onChange={(e) => setImage(e.target.value)}
					InputProps={{
						placeholder: `Enter Image URL, current: ${currMovie.image}`,
					}}
					fullWidth
				/>
				<TextField
					value={premiered}
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
						onClick={handleUpdate}
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
			{message && <Success message={message} />}
			{errorMessage && <Error message={errorMessage} />}
		</div>
	)
}
