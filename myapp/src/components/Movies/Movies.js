import { useState, useEffect } from "react"
import { Button, Container } from "@mui/material"
import { AllMovies } from "./AllMovies"
import { AddMovie } from "./AddMovie"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"

export const Movies = () => {
	const dispatch = useDispatch()
	const movies = useSelector((state) => state.movies)
	const [addMovieBtn, setAddMovieBtn] = useState(false)
	const [allMovieBtn, setAllMovieBtn] = useState(false)

	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	// let showMovieId = searchParams.get("showMovieId")
	const [showMovieId, setShowMovieId] = useState(
		searchParams.get("showMovieId")
	)

	useEffect(() => {
		console.log("useEffect - showMovieId: ", showMovieId)
		if (showMovieId) {
			changeShow("all")
		}
	}, [showMovieId])

	const clearShowMovieId = () => {
		if (showMovieId) {
			const urlWithoutParam = window.location.href.split("?")[0]
			window.history.pushState({}, document.title, urlWithoutParam)
			setShowMovieId(null)
		}
	}

	const changeShow = (buttonClicked) => {
		if (buttonClicked == "all") {
			setAllMovieBtn(true)
			setAddMovieBtn(false)
		} else {
			clearShowMovieId()
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
						backgroundColor: allMovieBtn ? "#4CAF50" : "#008080",
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
						backgroundColor: addMovieBtn ? "#4CAF50" : "#008080",
						":hover": { border: "3px solid black", backgroundColor: "#008080" },
					}}
				>
					Add Movie
				</Button>
			</Container>
			{allMovieBtn && (
				<AllMovies moviesPromise={movies} showMovieId={showMovieId} />
			)}
			{addMovieBtn && <AddMovie onCancel={changeShow} />}
		</div>
	)
}
