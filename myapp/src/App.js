import "./App.css"
import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
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
import { EditSubscription } from "./components/Subscriptions/EditSubscription"

function App() {
	const location = useLocation()
	return (
		<div>
			<NavBar />
			<Typography
				sx={{ marginTop: "100px" }}
				variant="h1"
				color="initial"
			></Typography>

			<Routes>
				<Route path="/" />
				<Route path="/movies" element={<Movies />} />
				<Route path="/subscriptions" element={<Subscriptions />} />
				<Route path="/users" element={<Users />} />
				<Route path="/about" element={<About />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/editmovie/:id" element={<EditMovie />} />
				<Route path="/edituser/:username" element={<EditUser />} />
				<Route path="/editsubscription/:id" element={<EditSubscription />} />
				<Route path="*" element={<Error message="Page Not Found" />} />
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
