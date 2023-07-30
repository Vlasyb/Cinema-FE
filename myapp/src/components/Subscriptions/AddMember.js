import React, { useState } from "react"
import { Button, Container, TextField, Typography } from "@mui/material"
import axios from "axios"
import { Success } from "../Success"
import { Error } from "../Error"

export const AddMember = ({ onCancel }) => {
	const port = 8040

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [city, setCity] = useState("")

	const [message, setMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const handleCancelClick = () => {
		onCancel("all") // Call the onCancel function passed from the parent component
	}

	const handleSave = async () => {
		console.log("Saving")
		const newMember = {
			name,
			email,
			city,
		}
		try {
			const { data: res } = await axios.post(
				`http://localhost:${port}/members/`,
				newMember,
				{ withCredentials: true }
			)
			console.log(res)
			setName("")
			setEmail("")
			setCity("")
			setMessage(res)
			setTimeout(() => {
				setMessage("")
			}, 2500)
		} catch (err) {
			setErrorMessage(err)
			setTimeout(() => {
				setErrorMessage("")
			}, 2500)
			console.error("err ", err)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault() // Prevent the default form submission behavior
		handleSave() // Call the handleSave function to create a new member
	}

	return (
		<div>
			<Container
				component="form" // Use form element for submitting data
				onSubmit={handleSubmit}
				maxWidth="sm"
				sx={{
					mt: "2em",
					border: "1px solid #008080 ",
					":hover": {
						border: "2px solid #008080",
					},
					borderRadius: 4,
					boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
					padding: 2,
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
					sx={{ color: "#008080", textAlign: "center" }}
				>
					Add Member
				</Typography>
				<TextField
					label="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					fullWidth
				/>
				<TextField
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
				/>
				<TextField
					label="City"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					fullWidth
				/>

				<div
					className="button-group"
					sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
				>
					<Button
						variant="outlined"
						className="cancel-button"
						onClick={handleCancelClick}
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
						type="submit"
						variant="contained"
						color="primary"
						sx={{
							backgroundColor: "#008080",
							"&:hover": {
								backgroundColor: "#006666",
							},
						}}
					>
						Save
					</Button>
				</div>
			</Container>
			{message && <Success message={message} />}
			{errorMessage && <Error message={errorMessage} />}
		</div>
	)
}
