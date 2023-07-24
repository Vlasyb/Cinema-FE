import { useState } from "react"
import React from "react"
import { Success } from "../Success"
import { Error } from "../Error"
import axios from "axios"
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
import CircularProgress from "@mui/material/CircularProgress"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

export const Login = () => {
	const [usernameInput, setUsernameInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")
	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const port = "8040"
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)

		const userCredentials = {
			username: usernameInput,
			password: passwordInput,
		}
		try {
			console.log(userCredentials)
			const { data: res } = await axios.post(
				`http://localhost:${port}/users/login`,
				userCredentials,
				{ withCredentials: true }
			)
			dispatch({ type: "SAVE_LOGGED_USER", payload: res.user })
			setMessage(res.message)
			setTimeout(() => {
				navigate("/")
			}, 1500)
		} catch (err) {
			setIsLoading(false)
			console.log("err ", err)
			setErrorMessage(err.response.data.message)
			setTimeout(() => {
				setErrorMessage("")
			}, 2500)
		}
	}

	return (
		<div>
			<Typography
				sx={{ textAlign: "center", marginTop: "3em" }}
				variant="h2"
				color="initial"
			>
				Please Sign In
			</Typography>
			{/* component="main" */}
			<Container maxWidth="xs">
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						autoFocus
						onChange={(e) => {
							setUsernameInput(e.target.value)
						}}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={(e) => {
							setPasswordInput(e.target.value)
						}}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2, backgroundColor: "#008080" }}
					>
						Sign In
					</Button>
					<Grid container sx={{ alignItems: "center" }}>
						<Link href="/register" variant="body3">
							{"New User? Create Account"}
						</Link>
					</Grid>
				</Box>
			</Container>
			{message && <Success message={message} />}
			{errorMessage && <Error message={errorMessage} />}
			{isLoading && (
				<Box
					sx={{
						display: "flex",
						marginTop: 2,
						padding: 0,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<CircularProgress />
				</Box>
			)}
		</div>
	)
}
