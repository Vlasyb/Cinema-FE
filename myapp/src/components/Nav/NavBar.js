import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Stack,
	Button,
} from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"

export const NavBar = () => {
	const port = "8040"

	const location = useLocation()
	const dispatch = useDispatch()
	const loggedUserStore = useSelector((state) => state.loggedUser)

	const [loggedUser, setLoggedUser] = useState({})

	const handleLogout = async (e) => {
		try {
			const response = await axios.get(
				`http://localhost:${port}/users/logout`,
				{ withCredentials: true }
			)
			dispatch({ type: "SAVE_LOGGED_USER", payload: {} })
			window.location.reload()
		} catch (err) {
			console.error("err ", err)
		}
	}
	const isPathActive = (path) => {
		return location.pathname === path
	}

	useEffect(() => {
		// Check if loggedUserStore is a Promise
		if (typeof loggedUserStore.then === "function") {
			loggedUserStore.then((data) => {
				setLoggedUser(data)
			})
		} else {
			// If it's not a Promise, directly set the state
			setLoggedUser(loggedUserStore)
		}
	}, [loggedUserStore])

	const handleMoviesVisibility = () => {
		if (loggedUser.isAdmin) {
			return true
		}
		console.log(loggedUser)
		if (!loggedUser.username) {
			return false
		}
		console.log(loggedUser.permissions)
		if (loggedUser.permissions.includes("view movies")) {
			return true
		}
		return false
	}
	const handleSubscriptionsVisibility = () => {
		if (loggedUser.isAdmin) {
			return true
		}
		console.log(loggedUser)
		if (!loggedUser.username) {
			return false
		}
		console.log(loggedUser.permissions)
		if (loggedUser.permissions.includes("view subscriptions")) {
			return true
		}
		return false
	}

	return (
		<div>
			<AppBar
				sx={{
					fontFamily: "Poppins",
					backgroundColor: "black",
					padding: "5px",
				}}
				position="fixed"
				color="primary"
			>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						color="inherit"
						aria-label="logo"
						edge="start"
						sx={{
							marginRight: "1%",
							backgroundColor: isPathActive("/") ? "#4CAF50" : "none",
						}}
					>
						<HomeIcon />
					</IconButton>
					<Typography
						sx={{ marginRight: "5%", fontFamily: "Poppins" }}
						variant="h6"
						color="white"
					>
						Greetings{" "}
						{loggedUser.username || "Guest. Log in To Access Sites Features"}
					</Typography>
					<Stack direction="row" spacing={7}>
						<Button
							sx={{
								fontSize: "100%",
								fontFamily: "Poppins",
								width: "100%",
								color: "white",
								backgroundColor: "#008080",
								visibility: handleMoviesVisibility() ? "visible" : "hidden",

								backgroundColor: isPathActive("/movies") ? "#4CAF50" : "none",
							}}
							component={Link}
							to="/movies"
							size="medium"
							variant="text"
							color="primary"
						>
							Movies
						</Button>
						<Button
							sx={{
								fontSize: "100%",
								fontFamily: "Poppins",
								width: "100%",
								color: "white",
								visibility: handleSubscriptionsVisibility()
									? "visible"
									: "hidden",
								backgroundColor: isPathActive("/subscriptions")
									? "#4CAF50"
									: "none",
							}}
							component={Link}
							to="/subscriptions"
							size="medium"
							variant="text"
							color="primary"
						>
							Subscriptions
						</Button>
						<Button
							sx={{
								fontSize: "100%",
								fontFamily: "Poppins",
								textAlign: "center",
								width: "100%",
								color: "white",
								visibility: loggedUser.isAdmin ? "visible" : "hidden",
								backgroundColor: isPathActive("/users") ? "#4CAF50" : "none",
							}}
							component={Link}
							to="/users"
							size="medium"
							variant="text"
							color="primary"
						>
							Users Managment
						</Button>
					</Stack>
					<Button
						sx={{
							marginLeft: "auto",
							fontSize: "100%",
							fontFamily: "Poppins",
							color: "white",
							visibility: loggedUser.username ? "visible" : "hidden",
						}}
						component={Link}
						to="/login"
						startIcon={<ExitToAppIcon />}
						variant="text"
						color="inherit"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}
