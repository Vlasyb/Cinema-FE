import React from "react"
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

export const NavBar = () => {
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
						Hello Unknown
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
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}
