import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import {
	FormControlLabel,
	Toolbar,
	TextField,
	Typography,
	Button,
	Grid,
	Box,
	CardContent,
	Input,
	Card,
	Checkbox,
	Copyright,
} from "@mui/material"
import { useSelector } from "react-redux"

export const User = ({ user }) => {
	const handleDelete = () => {
		console.log("Delete User")
	}

	return (
		<div>
			<Card
				sx={{
					mb: 4,
					backgroundColor: "white",
					color: "black",
					border: "1px solid #008080 ",
					":hover": {
						border: "2px solid #008080",
					},
				}}
			>
				<CardContent>
					<Typography variant="h6" component="div">
						Full Name: {user.firstName + " " + user.lastName}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Username: {user.username}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Session Timeout: {user.sessionTimeOut}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Created Date: {user.createdDate}
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Permissions:{" "}
						{user.permissions.permissions.length !== 0
							? user.permissions.permissions.join(", ")
							: "None"}
					</Typography>
				</CardContent>
				<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
					<Button
						variant="contained"
						color="primary"
						component={Link}
						to={`/edituser/${user.username}`}
						sx={{
							width: "25%",
							backgroundColor: "#008080",
							fontFamily: "poppins",
							fontSize: "16px",
							color: "white",
							":hover": {
								border: "1px solid black",
								backgroundColor: "#008080",
							},
						}}
					>
						Edit
					</Button>
					<Button
						variant="contained"
						color="error"
						onClick={handleDelete}
						sx={{
							width: "25%",
							backgroundColor: "#c62828",
							color: "white",
							fontFamily: "poppins",
							fontSize: "16px",
							":hover": {
								border: "1px solid black",
								backgroundColor: "#c62828",
							},
						}}
					>
						Delete
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
