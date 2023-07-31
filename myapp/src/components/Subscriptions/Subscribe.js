import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
	Button,
	Container,
	Typography,
	List,
	FormControl,
	TextField,
	ListItem,
	ListItemText,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material"
import { useSelector } from "react-redux"
import axios from "axios"

export const Subscribe = ({ member }) => {
	const [btnClicked, setBtnClicked] = useState(false)
	const [moviesWatched, setMoviesWatched] = useState(null)
	const port = 8040
	const moviesState = useSelector((state) => state.movies)
	const [fullMovies, setFullMovies] = useState([])

	const [movieName, setMovieName] = useState("")

	const [nonWatchedMovies, setNonWatchedMovies] = useState([])
	const [selectedMovie, setSelectedMovie] = useState("")
	const [selectedDate, setSelectedDate] = useState("")

	const convertDateFormat = (dateString) => {
		const dateParts = dateString.split("-")
		if (dateParts.length === 3) {
			const [year, month, day] = dateParts
			return `${day}/${month}/${year}`
		}
		return dateString // Return the original string if the format is not as expected
	}

	// not finished
	const handleSubscribe = async () => {
		if (selectedMovie && selectedDate) {
			try {
				const formattedDate = convertDateFormat(selectedDate)
				console.log(formattedDate)
				const { data: movieRes } = await axios.get(
					`http://localhost:${port}/movies/movie/${selectedMovie}`,
					{ withCredentials: true }
				)
				setMovieName(movieRes.name)

				await axios.put(
					`http://localhost:${port}/subscriptions/subscribe/${selectedMovie}`,
					{
						memberId: member._id,
						date: formattedDate,
					},
					{ withCredentials: true }
				)
				// Update the movies watched list
				getMoviesWatched()
				alert(`Subscribed ${member.name} to ${movieName}`)
			} catch (error) {
				console.error("Error subscribing to movie:", error)
			}
		}
	}
	//not finished
	const getNonWatchedMovies = async () => {
		if (nonWatchedMovies.length == 0) {
			try {
				const { data: res } = await axios.get(
					`http://localhost:${port}/movies/nonWatchedMovies/${member._id}`,
					{ withCredentials: true }
				)
				setNonWatchedMovies(res)
			} catch (error) {
				console.error("Error fetching non-watched movies:", error)
			}
		}
	}

	const getMoviesWatched = async () => {
		if (moviesWatched == null) {
			try {
				const { data: res } = await axios.get(
					`http://localhost:${port}/subscriptions/subscriptions/${member._id}`,
					{ withCredentials: true }
				)
				setMoviesWatched(res[0])
				// setBtnClicked(!btnClicked)
			} catch (error) {
				console.error("Error fetching movies watched:", error)
			}
		}
	}

	useEffect(() => {
		moviesState.then((moviesStateResolved) => {
			setFullMovies(moviesStateResolved)
		})
	}, [moviesState])

	useEffect(() => {
		if (moviesWatched === null) {
			getMoviesWatched()
		}
	}, [moviesWatched])

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					setBtnClicked(!btnClicked)
					getNonWatchedMovies()
				}}
				sx={{
					backgroundColor: "#008080",
					color: "white",
					marginBottom: 2,
					"&:hover": {
						backgroundColor: "#006666",
					},
				}}
			>
				Subscribe to New Movie
			</Button>

			{/* Subscribe box */}
			{btnClicked && (
				<Container
					maxWidth="sm"
					sx={{
						mt: 2,
						textAlign: "center",
						padding: "1rem",
						borderRadius: "8px",
						border: "2px solid #008080",
					}}
				>
					<Typography variant="h6">Subscribe to New Movie:</Typography>
					<FormControl fullWidth sx={{ mt: 1 }}>
						<InputLabel>Select a Movie</InputLabel>
						<Select
							value={selectedMovie}
							onChange={(e) => setSelectedMovie(e.target.value)}
							sx={{ minWidth: 200 }}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 300, // Set the maximum height for the dropdown menu
									},
								},
							}}
						>
							{nonWatchedMovies.map((movie) => (
								<MenuItem key={movie._id} value={movie._id}>
									{movie.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						label="Select a Date"
						type="date"
						InputLabelProps={{
							shrink: true,
						}}
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
						fullWidth
						sx={{ mt: 1, minWidth: 200 }}
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubscribe}
						sx={{
							mt: 2,
							backgroundColor: "#008080",
							"&:hover": { backgroundColor: "#006666" },
						}}
					>
						Subscribe
					</Button>
				</Container>
			)}
			{/* Subscribe Box */}

			<List>
				{moviesWatched?.movies?.map((movie) => (
					<ListItem key={movie._id}>
						<ListItemText
							primary={
								<Link
									to={`/movies?showMovieId=${movie.movieId}`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									{
										fullMovies.find(
											(fullMovie) => movie.movieId == fullMovie._id
										).name
									}
								</Link>
							}
							secondary={`Watched on ${new Date(
								movie.date
							).toLocaleDateString()}`}
						/>
					</ListItem>
				))}
			</List>
		</div>
	)
}
