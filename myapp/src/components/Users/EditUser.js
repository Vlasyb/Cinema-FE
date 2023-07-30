import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Success } from "../Success"
import { Error } from "../Error"
import axios from "axios"
import {
	FormControlLabel,
	TextField,
	Typography,
	Button,
	Checkbox,
	Container,
} from "@mui/material"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export const EditUser = () => {
	const port = 8040

	const dispatch = useDispatch()
	const users = useSelector(((state) => state.users) || [])
	const [currUser, setCurrUser] = useState({})
	const { username } = useParams()

	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const [firstName, setFirstName] = useState(currUser.firstName || "")
	const [lastName, setLastName] = useState(currUser.lastName || "")
	const [usernameContainer, setUsernameContainer] = useState(
		currUser.usernameContainer || ""
	)
	const [sessionTimeOut, setSessionTimeOut] = useState(
		currUser.sessionTimeOut || ""
	)
	const [permissions, setPermissions] = useState(currUser.permissions || [])

	const handleUpdate = async (e) => {
		e.preventDefault()
		// Create the updated user object and call the onSave function
		const updatedUser = {
			// ...currUser,
			firstName: firstName == "" ? currUser.firstName : firstName,
			lastName: lastName == "" ? currUser.lastName : lastName,
			username: usernameContainer == "" ? currUser.username : usernameContainer,
			sessionTimeOut:
				sessionTimeOut == "" ? currUser.sessionTimeOut : sessionTimeOut,
			permissions,
		}
		try {
			const { data: res } = await axios.put(
				`http://localhost:${port}/users/${currUser.id}`,
				updatedUser,
				{ withCredentials: true }
			)
			console.log("SAVING ", res)
			setFirstName("")
			setLastName("")
			setUsernameContainer("")
			setSessionTimeOut("")
			setPermissions([])
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
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					InputProps={{
						placeholder: `Enter First Name, current: ${currUser.firstName}`,
					}}
					fullWidth
				/>
				<TextField
					label="Last Name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					InputProps={{
						placeholder: `Enter Last Name, current: ${currUser.lastName}`,
					}}
					fullWidth
				/>
				<TextField
					value={usernameContainer}
					label="Username"
					InputProps={{
						placeholder: `Enter Username, current: ${currUser.username}`,
					}}
					onChange={(e) => setUsernameContainer(e.target.value)}
					fullWidth
				/>
				<TextField
					value={sessionTimeOut}
					label="Session Timeout"
					onChange={(e) => setSessionTimeOut(+e.target.value)}
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
