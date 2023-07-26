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
import axios from "axios"

export const Movie = ({ movie }) => {
	const members = useSelector((state) => state.members)
	const [membersNames, setMembersNames] = useState([])
	const port = 8040

	useEffect(() => {
		axios
			.get(
				`http://localhost:${port}/subscriptions/membersWatched/${movie._id}`,
				{
					withCredentials: true,
				}
			)
			.then((response) => {
				members.then((resolvedMembers) => {
					const updatedMembersNames = response.data.map((memberWatchedObj) => {
						const chosenMember = resolvedMembers.find(
							(member) => member._id === memberWatchedObj[0]
						)
						return {
							memberWatchedAt: `${chosenMember.name} | ${
								memberWatchedObj[1].split("T")[0]
							}`,
							memberId: memberWatchedObj[0],
						}
					})
					setMembersNames(updatedMembersNames)
				})
			})
			.catch((error) => {
				console.error("Error fetching members watched:", error)
			})
	}, [movie._id, members])

	return (
		<Card
			sx={{
				mb: 4,
				backgroundColor: "white",
				color: "black",
				border: "1px solid #008080",
				":hover": {
					border: "2px solid #008080",
				},
			}}
		>
			<CardContent>
				<Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
					{movie.name}
				</Typography>
				<Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
					Genres: {movie.genres.join(", ")}
				</Typography>
				<img src={movie.image} alt={movie.name} sx={{ width: "100%", mt: 2 }} />
				<Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
					Subs Watched:
				</Typography>
				{membersNames.map((member) => (
					<Link
						to={`/editMember/${member.memberId}`}
						key={`${member.memberWatchedAt}`}
					>
						<Typography variant="body2">
							{/* key={`${member} und ${movie._id}`} */}
							{member.memberWatchedAt}
						</Typography>
					</Link>
				))}
			</CardContent>
			<CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
				<Button
					variant="contained"
					color="primary"
					component={Link}
					to={`/editmovie/${movie._id}`}
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
					// Add the delete functionality here
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
	)
}
