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

export const Movies = () => {
	const [addMovieBtn, setAddMovieBtn] = useState(false)
	const [allMovieBtn, setAllMovieBtn] = useState(false)

	const changeShow = (buttonClicked) => {
		if (buttonClicked == "all") {
			setAllMovieBtn(true)
			setAddMovieBtn(false)
		} else {
			setAddMovieBtn(true)
			setAllMovieBtn(false)
		}
	}

	return (
		<div>
			<Container
				maxWidth="sm"
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				<Button
					variant="contained"
					onClick={() => changeShow("all")}
					sx={{
						mt: 3,
						width: "45%",
						backgroundColor: "#008080",
						fontFamily: "poppins",
						fontSize: "16px",
						":hover": { border: "3px solid black", backgroundColor: "#008080" },
					}}
				>
					All Movies
				</Button>
				<Button
					variant="contained"
					onClick={() => changeShow("add")}
					sx={{
						mt: 3,
						width: "45%",
						backgroundColor: "#008080",
						fontFamily: "poppins",
						fontSize: "16px",
						":hover": { border: "3px solid black", backgroundColor: "#008080" },
					}}
				>
					Add Movie
				</Button>
			</Container>
		</div>
	)
}
