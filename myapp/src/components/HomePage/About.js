import React from "react"
import { Typography, Card } from "@mui/material"

export const About = () => {
	return (
		<div style={{ textAlign: "center", width: "80%", marginLeft: "10%" }}>
			<Typography sx={{ marginTop: "10%" }} variant="h2" color="initial">
				About Us
			</Typography>
			<Card
				sx={{
					height: "50%",
					marginTop: "3%",
					padding: "1%",
					// backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
					// backgroundSize: "cover",
					// backgroundPosition: "center",
					border: "3px solid #EDEADE",
					backgroundColor: "#f8f8ff",
				}}
			>
				<Typography
					sx={{ fontFamily: "Poppins", fontSize: "18px", fontWeight: "600" }}
					variant="body1"
					color="initial"
				>
					Welcome to our website, designed specifically for cinema workers like
					you! Our platform is here to simplify and streamline your tasks when
					it comes to managing members, movies, and subscriptions.
				</Typography>
				<Typography
					sx={{
						fontFamily: "Poppins",
						marginTop: "1.5em",
						fontSize: "18px",
						fontWeight: "600",
					}}
					variant="body1"
					color="initial"
				>
					With our user-friendly interface, you can easily handle member
					management. You have the ability to register new members, maintain
					their profiles, and keep track of their subscription information. This
					makes it simple for you to stay organized and provide personalized
					service to the members who watch movies at your cinema.
				</Typography>
				<Typography
					sx={{
						fontFamily: "Poppins",
						marginTop: "1.5em",
						fontSize: "18px",
						fontWeight: "600",
					}}
					variant="body1"
					color="initial"
				>
					Managing movies has never been easier! Our platform allows you to
					effortlessly add and update movies in your collection. You can enter
					movie details such as titles, genres, and release dates, ensuring that
					your movie library is always up to date. This way, you can easily
					provide the latest and most accurate information to your members.
				</Typography>
				<Typography
					sx={{
						fontFamily: "Poppins",
						marginTop: "1.5em",
						fontSize: "18px",
						fontWeight: "600",
					}}
					variant="body1"
					color="initial"
				>
					Thank you for choosing our website to help you manage members and
					movies at your cinema. We are committed to providing you with a
					hassle-free experience and assisting you in ensuring that your members
					have a seamless movie-watching experience
				</Typography>
			</Card>
		</div>
	)
}
