import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Container, Grid, Typography, Box } from "@mui/material"
import axios from "axios"
import { Subscribe } from "./Subscribe"

export const AllMembers = ({ membersPromise }) => {
	const [members, setMembers] = useState([])
	const port = 8040

	// Fetch all members from the API using the membersPromise
	useEffect(() => {
		membersPromise.then((resolvedMembers) => {
			setMembers(resolvedMembers)
		})
	}, [membersPromise])

	const handleDeleteMember = (id) => {
		// TODO: Implement the logic to delete the member with the given id
		// For example using fetch or axios library:
		// axios
		//   .delete(`http://localhost:${port}/members/${id}`, {
		//     withCredentials: true,
		//   })
		//   .then((response) => {
		//     // Handle the response if needed
		//   })
		//   .catch((error) => {
		//     // Handle errors if any
		//   });
	}

	return (
		<div>
			<Container
				maxWidth="sm"
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center", // Center the container horizontally
				}}
			>
				<Typography
					sx={{ mt: 3, mb: 3, textAlign: "center" }}
					variant="h3"
					color="initial"
				>
					All Members
				</Typography>

				<Grid container spacing={2}>
					{members.map((member) => (
						<Grid item xs={12} key={member._id}>
							<Box
								sx={{
									border: "1px solid #008080",
									borderRadius: 4,
									boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
									padding: 2,
									marginBottom: 2,
									backgroundColor: "#f0f0f0",
								}}
							>
								<Typography variant="h5" sx={{ textAlign: "center" }}>
									{`${member.name}`}
								</Typography>
								<Typography variant="body1" color="text.secondary">
									{`Email: ${member.email}`}
								</Typography>
								<Typography variant="body1" color="text.secondary">
									{`City: ${member.city}`}
								</Typography>
								<Button
									variant="contained"
									component={Link}
									to={`/editmember/${member._id}`}
									sx={{
										backgroundColor: "#008080",
										color: "white",
										marginRight: 1,
										"&:hover": {
											backgroundColor: "#006666",
										},
									}}
								>
									Edit
								</Button>
								<Button
									variant="contained"
									color="error"
									onClick={() => handleDeleteMember(member._id)}
									sx={{
										backgroundColor: "#c62828",
										color: "white",
										"&:hover": {
											backgroundColor: "#b00020",
										},
									}}
								>
									Delete
								</Button>

								<Box sx={{ marginTop: 2 }}>
									<Typography
										variant="body1"
										color="text.secondary"
										sx={{ mb: 0.5 }}
									>
										Movies Watched:
									</Typography>
									<Subscribe member={member} />
								</Box>
							</Box>
						</Grid>
					))}
				</Grid>
			</Container>
		</div>
	)
}
