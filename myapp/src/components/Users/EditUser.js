import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
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
import { useSelector, useDispatch } from "react-redux"

export const EditUser = () => {
	const port = 8040

	const dispatch = useDispatch()
	const navigate = useNavigate()

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
		const updatedUser = {
			firstName: firstName == "" ? currUser.firstName : firstName,
			lastName: lastName == "" ? currUser.lastName : lastName,
			// username: usernameContainer == "" ? currUser.username : usernameContainer,
			sessionTimeOut:
				sessionTimeOut == "" ? currUser.sessionTimeOut : sessionTimeOut,
			permissions,
		}

		if (usernameContainer !== "") {
			updatedUser.username = usernameContainer
		}
		try {
			const { data: res } = await axios.put(
				`http://localhost:${port}/users/${currUser.id}`,
				updatedUser,
				{ withCredentials: true }
			)
			if (usernameContainer !== "") {
				navigate(`/edituser/${usernameContainer}`)
			}
			console.log("SAVING ", res)
			setFirstName("")
			setLastName("")
			setUsernameContainer("")
			setSessionTimeOut("")
			setPermissions([])
			if (res !== "Updated") {
				setErrorMessage(res)
			} else {
				setMessage(res)
			}
			setTimeout(() => {
				setMessage("")
				setErrorMessage("")
			}, 2500)
			// dispatch("LOAD_USERS")
		} catch (err) {
			setErrorMessage(err)
			setTimeout(() => {
				setErrorMessage("")
			}, 2500)
			console.error("err ", err)
		}
	}

	const handleChange = (e, checkbox) => {
		setPermissions((prev) => {
			if (e.target.checked) {
				if (
					checkbox.key == "create subscriptions" ||
					checkbox.key == "delete subscriptions" ||
					checkbox.key == "update subscriptions"
				) {
					return [...prev, checkbox.key, "view subscriptions"]
				} else if (
					checkbox.key == "create movies" ||
					checkbox.key == "delete movies" ||
					checkbox.key == "update movies"
				) {
					return [...prev, checkbox.key, "view movies"]
				} else {
					return [...prev, checkbox.key]
				}
			} else {
				if (checkbox.key === "view subscriptions") {
					// If "view subscriptions" is unchecked, also uncheck the related permissions
					return prev.filter(
						(item) =>
							item !== "create subscriptions" &&
							item !== "delete subscriptions" &&
							item !== "update subscriptions" &&
							item !== "view subscriptions"
					)
				} else if (checkbox.key === "view movies") {
					// If "view movies" is unchecked, also uncheck the related permissions
					return prev.filter(
						(item) =>
							item !== "create movies" &&
							item !== "delete movies" &&
							item !== "update movies" &&
							item !== "view movies"
					)
				} else {
					return prev.filter((item) => item !== checkbox.key)
				}
			}
		})
	}

	const permissionCheckboxes = [
		{ key: "view subscriptions", label: "view subscriptions" },
		{ key: "create subscriptions", label: "create subscriptions" },
		{ key: "delete subscriptions", label: "delete subscriptions" },
		{ key: "update subscriptions", label: "update subscriptions" },
		{ key: "view movies", label: "view movies" },
		{ key: "create movies", label: "create movies" },
		{ key: "delete movies", label: "delete movies" },
		{ key: "update movies", label: "update movies" },
	]

	useEffect(() => {
		try {
			users.then((users) => {
				console.log("users:", users)
				if (Array.isArray(users) && users.length !== 0) {
					const foundUser = users.find((user) => user.username == username)
					console.log("found user:", foundUser)
					if (foundUser) {
						setCurrUser(foundUser)
					} else {
						// Handle case when user is not found
						console.log("User not found")
					}
				}
			})
		} catch (error) {
			console.log("Haven't resolved promise yet:", error)
		}
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
				{/* created Date (Read-only input) */}
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
									onChange={(e) => handleChange(e, checkbox)}
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
