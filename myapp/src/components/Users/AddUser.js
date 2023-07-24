import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
	Typography,
} from "@mui/material"

export const AddUser = ({ onCancel }) => {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [username, setUsername] = useState("")
	const [sessionTimeout, setSessionTimeout] = useState("")
	const [permissions, setPermissions] = useState([])

	const handleCancelClick = () => {
		onCancel("all") // Call the onCancel function passed from the parent component
	}

	const handleSave = () => {
		console.log("Saving")
		// Create the user object and call the onSave function
		const newUser = {
			firstName,
			lastName,
			username,
			sessionTimeout,
			permissions,
		}
		// TODO: Send a POST request to create a new user in the database
		// For example using fetch or axios library:
		// fetch('/api/users', {
		//   method: 'POST',
		//   headers: {
		//     'Content-Type': 'application/json',
		//   },
		//   body: JSON.stringify(newUser),
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
		handleSave() // Call the handleSave function to create a new user
	}

	const permissionCheckboxes = [
		{ key: "viewSubs", label: "View Subscriptions" },
		{ key: "createSubs", label: "Create Subscriptions" },
		{ key: "deleteSubs", label: "Delete Subscriptions" },
		{ key: "updateSubs", label: "Update Subscriptions" },
		{ key: "viewMovies", label: "View Movies" },
		{ key: "createMovies", label: "Create Movies" },
		{ key: "deleteMovies", label: "Delete Movies" },
		{ key: "updateMovies", label: "Update Movies" },
	]

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
				Add User
			</Typography>
			<TextField
				label="First Name"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				fullWidth
			/>
			<TextField
				label="Last Name"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				fullWidth
			/>
			<TextField
				required
				label="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				fullWidth
			/>
			<TextField
				label="Session Timeout"
				value={sessionTimeout}
				onChange={(e) => setSessionTimeout(e.target.value)}
				fullWidth
			/>
			{/* Permissions */}
			<div className="permissions-checkbox" sx={{ mt: 2 }}>
				<Typography variant="subtitle1">Permissions:</Typography>
				{permissionCheckboxes.map((checkbox) => (
					<FormControlLabel
						key={checkbox.key}
						control={
							<Checkbox
								sx={{
									padding: "0.5rem",
									"&.Mui-checked": {
										color: "#008080",
									},
								}}
								checked={permissions.includes(checkbox.key)}
								onChange={(e) =>
									setPermissions((prev) => {
										if (e.target.checked) {
											return [...prev, checkbox.key]
										} else {
											return prev.filter((item) => item !== checkbox.key)
										}
									})
								}
							/>
						}
						label={checkbox.label}
						sx={{
							display: "block",
							textAlign: "left",
							paddingLeft: "1rem",
						}}
					/>
				))}
			</div>
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
