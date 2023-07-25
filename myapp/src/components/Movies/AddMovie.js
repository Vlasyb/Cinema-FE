import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Container, TextField, Typography, Box } from "@mui/material"

export const AddMovie = ({ onCancel }) => {
	const [name, setName] = useState("")
	const [genres, setGenres] = useState([])
	const [imageURL, setImageURL] = useState("")
	const [premiered, setPremiered] = useState("")

	const handleCancelClick = () => {
		onCancel("all") // Call the onCancel function passed from the parent component
	}

	const handleSave = () => {
		// Create the movie object and call the onSave function
		const newMovie = {
			name,
			genres,
			imageURL,
			premiered,
		}

		// TODO: Send a POST request to create a new movie in the database
		// For example using fetch or axios library:
		// fetch('/api/movies', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify(newMovie),
		// })
		//   .then(response => response.json())
		//   .then(data => {
		//     // Handle the response if needed
		//   })
		//   .catch(error => {
		//     // Handle errors if any
		//   });
	}

	const handleSubmit = (e) => {
		e.preventDefault() // Prevent the default form submission behavior
		handleSave() // Call the handleSave function to create a new movie
	}

	return (
		<Container
			component="form" // Use form element for submitting data
			onSubmit={handleSubmit}
			maxWidth="sm"
			sx={{
				mt: "2em",
				border: "1px solid #008080 ",
				":hover": {
					border: "2px solid #008080",
				},
				borderRadius: 4,
				boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
				padding: 2,
				backgroundColor: "#f0f0f0",
				"& .MuiTextField-root": { marginBottom: 2 },
				"& .button-group": {
					display: "flex",
					justifyContent: "flex-end",
					mt: 3,
				},
			}}
		>
			<Typography
				variant="h5"
				gutterBottom
				sx={{ color: "#008080", textAlign: "center" }}
			>
				Add Movie
			</Typography>
			<TextField
				label="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				fullWidth
				required // Set the name field as required
			/>
			<TextField
				label="Genres"
				value={genres}
				onChange={(e) => setGenres(e.target.value)}
				fullWidth
				multiline
			/>
			<TextField
				label="Image URL"
				value={imageURL}
				onChange={(e) => setImageURL(e.target.value)}
				fullWidth
			/>
			<TextField
				label="Premiered"
				value={premiered}
				onChange={(e) => setPremiered(e.target.value)}
				fullWidth
			/>
			<div className="button-group">
				<Button
					variant="outlined"
					className="cancel-button"
					onClick={handleCancelClick}
					component={Link}
					to={`/movies`}
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
				<Box ml={2}>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{
							backgroundColor: "#008080",
							"&:hover": {
								backgroundColor: "#006666",
							},
						}}
					>
						Save
					</Button>
				</Box>
			</div>
		</Container>
	)
}
