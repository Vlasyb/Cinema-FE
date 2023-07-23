import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

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

export const NavBar = () => {
	const port = "8040"
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
			localStorage.removeItem("loggedUser")
		} catch (err) {
			console.error("err ", err)
		}
	}

	useEffect(() => {
		const storedUser = localStorage.getItem("loggedUser")
		setLoggedUser(storedUser ? JSON.parse(storedUser) : {})
	}, [loggedUserStore]) // localStorage doesnt render by itself like useState and store

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
						}}
					>
						<HomeIcon />
					</IconButton>
					<Typography
						sx={{ marginRight: "5%", fontFamily: "Poppins" }}
						variant="h6"
						color="white"
					>
						Hello {loggedUser.firstName || "Unknown"}
						{/* Hello Unknown */}
					</Typography>
					<Stack direction="row" spacing={7}>
						<Button
							sx={{
								fontSize: "100%",
								fontFamily: "Poppins",
								width: "100%",
								color: "white",
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
