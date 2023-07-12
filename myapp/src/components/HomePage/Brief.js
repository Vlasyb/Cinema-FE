import React from "react"
import { Link } from "react-router-dom"
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Stack,
	Button,
	Card,
	CardMedia,
} from "@mui/material"

export const Brief = () => {
	return (
		<div>
			<Card sx={{ height: "26em", width: "88%", marginLeft: "6%" }}>
				<div style={{ position: "relative" }}>
					<CardMedia component="img" image={"/images/briefImg.png"} />
					<div
						style={{
							position: "absolute",
							color: "black",
							top: 20,
							fontSize: "20px",
							fontWeight: "600",
							textAlign: "center",
							left: "50%",
							transform: "translateX(-50%)",
						}}
					>
						{" "}
						Easily manage members, movies and subscriptions
					</div>
					<Button
						component={Link}
						to="/about"
						sx={{
							backgroundColor: "#333333",
							position: "absolute",
							color: "white",
							fontFamily: "Poppins",
							width: "25%",
							height: "3.5em",
							top: "17.5em",
							fontSize: "20px",
							fontWeight: "600",
							left: "50%",
							transform: "translateX(-50%)",
							// opacity: "0.9",
							":hover": {
								boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
								backgroundColor: "black",
							},
						}}
					>
						{" "}
						Read More
					</Button>
				</div>
			</Card>
		</div>
	)
}
