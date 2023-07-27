import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import {
	FormControlLabel,
	TextField,
	Typography,
	Button,
	Checkbox,
	Container,
} from "@mui/material"
import { useSelector } from "react-redux"

export const EditUser = () => {
	const users = useSelector(((state) => state.users) || [])
	const [currUser, setCurrUser] = useState({})
	const { username } = useParams()

	const [firstName, setFirstName] = useState(currUser.firstName || "")
	const [lastName, setLastName] = useState(currUser.lastName || "")
	const [usernameContainer, setUsernameContainer] = useState(
		currUser.usernameContainer || ""
	)
	const [sessionTimeout, setSessionTimeout] = useState(
		currUser.sessionTimeout || ""
	)
	const [permissions, setPermissions] = useState(currUser.permissions || [])

	const handleSave = () => {
		// Create the updated user object and call the onSave function
		const updatedUser = {
			...currUser,
			firstName,
			lastName,
			username,
			sessionTimeout,
			permissions,
		}
		// onSave(updatedUser);
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

	useEffect(() => {
		users.then((users) => {
			console.log("users:", users)
			if (Array.isArray(users) && users.length !== 0) {
				const foundUser = users.find((user) => user.username == username)
				console.log("found user:", foundUser)
				if (foundUser) {
					setCurrUser(foundUser)
					console.log("user set")
				} else {
					// Handle case when user is not found
					console.log("User not found")
				}
			}
		})
	}, [users, username, currUser])
	return (
		<div>
			<Typography
				variant="h4"
				color="initial"
				sx={{ textAlign: "center", mb: "2em", mt: "3.5em" }}
			>
				Edit User: {currUser.firstName} {currUser.lastName}
			</Typography>
			<Container
				maxWidth="sm"
				sx={{
					border: "1px solid #008080 ",
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
					sx={{ textAlign: "center", color: "#008080" }}
				>
					Edit User
				</Typography>
				<TextField
					label="First Name"
					onChange={(e) => setFirstName(e.target.value)}
					InputProps={{
						placeholder: `Enter First Name, current: ${currUser.firstName}`,
					}}
					fullWidth
				/>
				<TextField
					label="Last Name"
					onChange={(e) => setLastName(e.target.value)}
					InputProps={{
						placeholder: `Enter Last Name, current: ${currUser.lastName}`,
					}}
					fullWidth
				/>
				<TextField
					label="Username"
					InputProps={{
						placeholder: `Enter Username, current: ${currUser.username}`,
					}}
					onChange={(e) => setUsernameContainer(e.target.value)}
					fullWidth
				/>
				<TextField
					label="Session Timeout"
					onChange={(e) => setSessionTimeout(e.target.value)}
					InputProps={{
						placeholder: `Enter Session Timeout, current: ${currUser.sessionTimeOut}`,
					}}
					fullWidth
				/>
				{/* Created Date (Read-only input) */}
				<TextField
					label="Created Date"
					value={currUser.createdDate || ""}
					fullWidth
					InputProps={{
						readOnly: true,
					}}
				/>
				{/* Permissions */}
				<div className="permissions-checkbox">
					<Typography variant="subtitle1">Permissions:</Typography>
					{permissionCheckboxes.map((checkbox) => (
						<FormControlLabel
							sx={{
								display: "block",
								textAlign: "left",
								paddingLeft: "1rem",
							}}
							key={checkbox.key}
							control={
								<Checkbox
									sx={{
										padding: "0.5rem",
										"&.Mui-checked": {
											color: "#008080",
										},
									}}
									checked={permissions[checkbox.key] || false}
									onChange={(e) =>
										setPermissions((prev) => ({
											...prev,
											[checkbox.key]: e.target.checked,
										}))
									}
								/>
							}
							label={checkbox.label}
						/>
					))}
				</div>
				<div className="button-group">
					<Button
						variant="outlined"
						component={Link}
						to={`/users`}
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
