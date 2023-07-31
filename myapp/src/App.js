import "./App.css"
import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Typography } from "@mui/material"
import { NavBar } from "./components/Nav/NavBar"
import { Users } from "./components/Users/Users"
import { Movies } from "./components/Movies/Movies"
import { Subscriptions } from "./components/Subscriptions/Subscriptions"
import { Brief } from "./components/HomePage/Brief"
import { Tutorial } from "./components/HomePage/Tutorial"
import { Login } from "./components/LoginPage/Login"
import { Register } from "./components/LoginPage/Register"
import { About } from "./components/HomePage/About"
import { Error } from "./components/Error"
import { Success } from "./components/Success"
import { EditUser } from "./components/Users/EditUser"
import { EditMovie } from "./components/Movies/EditMovie"
import { EditMember } from "./components/Subscriptions/EditMember"

function App() {
	const location = useLocation()
	const dispatch = useDispatch()
	const loggedUser = useSelector((state) => state.loggedUser)
	const store = useSelector((state) => state)

	useEffect(() => {
		try {
			dispatch({ type: "VERIFY_AND_GET_LOGGED_USER" })
		} catch (err) {
			console.error("Error dispatching action:", err)
		}
	}, [])

	const handleLoggedUser = (loggedUserResolved) => {
		// Handle permissions based on the logged-in user
		if (loggedUserResolved.username === "admin") {
			dispatch({ type: "LOAD_MOVIES" })
			dispatch({ type: "LOAD_USERS" })
			dispatch({ type: "LOAD_MEMBERS" })
			dispatch({ type: "LOAD_SUBSCRIPTIONS" })
		} else {
			if (loggedUserResolved.permissions?.includes("view movies")) {
				dispatch({ type: "LOAD_MOVIES" })
			}
			if (loggedUserResolved.permissions?.includes("view subscriptions")) {
				dispatch({ type: "LOAD_MEMBERS" })
				dispatch({ type: "LOAD_SUBSCRIPTIONS" })
			}
		}
	}

	useEffect(() => {
		console.log("App UseEffect with dispatches -------------------")
		if (typeof loggedUser.then === "function") {
			// The loggedUser is a promise, so wait for it to resolve
			loggedUser.then((loggedUserResolved) => {
				console.log("logged user ", loggedUserResolved)
				if (loggedUserResolved) {
					handleLoggedUser(loggedUserResolved)
				}
			})
		} else if (loggedUser && Object.keys(loggedUser).length > 0) {
			// The loggedUser is not a promise and is a non-empty object
			console.log("loggedUser not a promise and not {}")
			handleLoggedUser(loggedUser)
		} else {
			console.log("Logged user is null or not yet resolved")
		}
	}, [loggedUser])

	return (
		<div>
			<NavBar />
			<Typography
				sx={{ marginTop: "100px" }}
				variant="h1"
				color="initial"
			></Typography>

			<Routes>
				<>
					<Route path="/" />
					<Route path="/movies" element={<Movies />} />
					<Route path="/subscriptions" element={<Subscriptions />} />
					<Route path="/users" element={<Users />} />
					<Route path="/about" element={<About />} />
					<Route path="/editmovie/:id" element={<EditMovie />} />
					<Route path="/edituser/:username" element={<EditUser />} />
					<Route path="/editmember/:id" element={<EditMember />} />
					<Route path="*" element={<Error message="Page Not Found" />} />
				</>
				<>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					{/* <Route path="*" element={<Error message="Page Not Found" />} /> */}
				</>
			</Routes>

			{location.pathname == "/" && (
				<h1 className="HomePageHeader">
					<span>Welcome to Cinema World</span>
					<span style={{ color: "#8187dc" }}>!</span>
				</h1>
			)}
			{location.pathname == "/" && <Brief />}
			{location.pathname == "/" && <Tutorial />}
		</div>
	)
}

export default App
