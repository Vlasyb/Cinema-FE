import { useState, useEffect } from "react"
import {
	FormControlLabel,
	Toolbar,
	TextField,
	Typography,
	Link,
	Button,
	Grid,
	Box,
	CssBaseline,
	InputLabel,
	Input,
	Container,
	Checkbox,
	Copyright,
} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { Movie } from "./Movie"

export const AllMovies = ({ moviesPromise }) => {
	const [movies, setMovies] = useState([])
	const [searchTerm, setSearchTerm] = useState("")

	const handleSearch = () => {
		// Call the backend function to filter movies based on the search term
		// For example using fetch or axios library:
		// fetch(`/api/movies?search=${searchTerm}`)
		//   .then(response => response.json())
		//   .then(data => {
		//     setMovies(data);
		//   })
		//   .catch(error => {
		//     // Handle errors if any
		//   });
	}

	//understand how the promise works
	useEffect(() => {
		moviesPromise.then((resolvedMovies) => {
			setMovies(resolvedMovies)
		})
	}, [moviesPromise])

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

				{movies.map((movie) => {
					return <Movie movie={movie} key={movie._id} />
				})}
			</Container>
		</div>
	)
}
