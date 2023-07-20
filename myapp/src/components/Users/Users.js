import { useState, useEffect } from "react"
import {
	FormControlLabel,
	Toolbar,
	TextField,
	Typography,
	Link,
	Button,
	Grid,
	Box,
	CssBaseline,
	InputLabel,
	Input,
	Container,
	Checkbox,
	Copyright,
} from "@mui/material"

export const Users = () => {
	const [addUserBtn, setAddUserBtn] = useState(false)
	const [allUserBtn, setAllUserBtn] = useState(false)
	return (
		<div>
			<Container
				maxWidth="sm"
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				<Button
					variant="contained"
					sx={{ mt: 3, width: "45%", backgroundColor: "#008080" }}
				>
					All Users
				</Button>
				<Button
					variant="contained"
					sx={{ mt: 3, width: "45%", backgroundColor: "#008080" }}
				>
					Add User
				</Button>
			</Container>
		</div>
	)
}
