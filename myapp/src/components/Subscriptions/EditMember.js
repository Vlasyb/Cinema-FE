import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { TextField, Typography, Button, Container } from "@mui/material"
import { useSelector } from "react-redux"

export const EditMember = () => {
	const members = useSelector((state) => state.members) || []
	const [currMember, setCurrMember] = useState({})
	const { id } = useParams()

	const [name, setName] = useState(currMember.name || "")
	const [email, setEmail] = useState(currMember.email || "")
	const [city, setCity] = useState(currMember.city || "")

	const handleSave = () => {
		// Create the updated member object and call the onSave function
		const updatedMember = {
			...currMember,
			name,
			email,
			city,
		}
		// onSave(updatedMember);
	}

	useEffect(() => {
		members.then((resolvedMembers) => {
			console.log("members:", resolvedMembers)
			if (Array.isArray(resolvedMembers) && resolvedMembers.length !== 0) {
				const foundMember = resolvedMembers.find((member) => member._id === id)
				console.log("found member:", foundMember)
				if (foundMember) {
					setCurrMember(foundMember)
					console.log("member set")
				} else {
					// Handle case when member is not found
					console.log("Member not found")
				}
			}
		})
	}, [members, id, currMember])

	return (
		<div>
			<Typography
				variant="h4"
				color="initial"
				sx={{ textAlign: "center", mb: "2em", mt: "3.5em" }}
			>
				Edit Member: {currMember.name}
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
					Edit Member
				</Typography>
				<TextField
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					InputProps={{
						placeholder: `Enter Name, current: ${currMember.name}`,
					}}
					fullWidth
				/>
				<TextField
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					InputProps={{
						placeholder: `Enter Email, current: ${currMember.email}`,
					}}
					fullWidth
				/>
				<TextField
					label="City"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					InputProps={{
						placeholder: `Enter City, current: ${currMember.city}`,
					}}
					fullWidth
				/>
				<div className="button-group">
					<Button
						variant="outlined"
						component={Link}
						to={`/subscriptions`}
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
						onClick={handleSave}
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
		</div>
	)
}
