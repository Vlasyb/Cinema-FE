import React, { useState } from "react"
import { Button, Container, TextField, Typography } from "@mui/material"

export const AddMember = ({ onCancel }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [city, setCity] = useState("")
	const [permissions, setPermissions] = useState([])

	const handleCancelClick = () => {
		onCancel("all") // Call the onCancel function passed from the parent component
	}

	const handleSave = () => {
		console.log("Saving")
		// Create the member object and call the onSave function
		const newMember = {
			name,
			email,
			city,
			permissions,
		}
		// TODO: Send a POST request to create a new member in the database
		// For example using fetch or axios library:
		// fetch('/api/members', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify(newMember),
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
		handleSave() // Call the handleSave function to create a new member
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
				"& .MuiTextField-root": {
					marginBottom: 2,
				},
				"& .permissions-checkbox": {
					marginBottom: 1,
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
				sx={{ color: "#008080", textAlign: "center" }}
			>
				Add Member
			</Typography>
			<TextField
				label="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				fullWidth
			/>
			<TextField
				label="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				fullWidth
			/>
			<TextField
				label="City"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				fullWidth
			/>

			<div
				className="button-group"
				sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
			>
				<Button
					variant="outlined"
					className="cancel-button"
					onClick={handleCancelClick}
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
			</div>
		</Container>
	)
}
