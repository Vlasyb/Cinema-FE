import React, { useState } from "react"
import { Success } from "../Success"
import { Error } from "../Error"
import {
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	TextField,
	Typography,
} from "@mui/material"
import axios from "axios"

export const AddUser = ({ onCancel }) => {
	const port = 8040

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [username, setUsername] = useState("")
	const [sessionTimeout, setSessionTimeout] = useState("")
	const [permissions, setPermissions] = useState([])

	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const handleCancelClick = () => {
		onCancel("all") // Call the onCancel function passed from the parent component
	}

	const handleSave = async () => {
		console.log("Saving")
		// Create the user object and call the onSave function
		const newUser = {
			firstName: firstName,
			lastName: lastName,
			username: username,
			sessionTimeOut: sessionTimeout,
			permissions: permissions,
		}
		try {
			const { data: res } = await axios.post(
				`http://localhost:${port}/users/signuser`,
				newUser,
				{ withCredentials: true }
			)
			console.log(res)
			setFirstName("")
			setLastName("")
			setUsername("")
			setSessionTimeout("")
			setPermissions([])
			setMessage(res)
			if (res.includes("already registered")) {
				setMessage("")
				setErrorMessage(res)
				setTimeout(() => {
					setErrorMessage("")
				}, 2500)
			}
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

	const handleSubmit = (e) => {
		e.preventDefault() // Prevent the default form submission behavior
		handleSave() // Call the handleSave function to create a new user
	}

	const handleChange = (e, checkbox) => {
		setPermissions((prev) => {
			if (e.target.checked) {
				if (
					checkbox.key == "Create Subscriptions" ||
					checkbox.key == "Delete Subscriptions" ||
					checkbox.key == "Update Subscriptions"
				) {
					return [...prev, checkbox.key, "View Subscriptions"]
				} else if (
					checkbox.key == "Create Movies" ||
					checkbox.key == "Delete Movies" ||
					checkbox.key == "Update Movies"
				) {
					return [...prev, checkbox.key, "View Movies"]
				} else {
					return [...prev, checkbox.key]
				}
			} else {
				if (checkbox.key === "View Subscriptions") {
					// If "View Subscriptions" is unchecked, also uncheck the related permissions
					return prev.filter(
						(item) =>
							item !== "Create Subscriptions" &&
							item !== "Delete Subscriptions" &&
							item !== "Update Subscriptions" &&
							item !== "View Subscriptions"
					)
				} else if (checkbox.key === "View Movies") {
					// If "View Movies" is unchecked, also uncheck the related permissions
					return prev.filter(
						(item) =>
							item !== "Create Movies" &&
							item !== "Delete Movies" &&
							item !== "Update Movies" &&
							item !== "View Movies"
					)
				} else {
					return prev.filter((item) => item !== checkbox.key)
				}
			}
		})
	}

	const permissionCheckboxes = [
		{ key: "View Subscriptions", label: "View Subscriptions" },
		{ key: "Create Subscriptions", label: "Create Subscriptions" },
		{ key: "Delete Subscriptions", label: "Delete Subscriptions" },
		{ key: "Update Subscriptions", label: "Update Subscriptions" },
		{ key: "View Movies", label: "View Movies" },
		{ key: "Create Movies", label: "Create Movies" },
		{ key: "Delete Movies", label: "Delete Movies" },
		{ key: "Update Movies", label: "Update Movies" },
	]

	return (
		<div>
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
									onChange={(e) => handleChange(e, checkbox)}
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
			{message && <Success message={message} />}
			{errorMessage && <Error message={errorMessage} />}
		</div>
	)
}
