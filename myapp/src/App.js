import "./App.css"
import { Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Typography } from "@mui/material"
import { NavBar } from "./components/Nav/NavBar"
import { Users } from "./components/Users/Users"
import { Movies } from "./components/Movies/Movies"
import { Subscriptions } from "./components/Subscriptions/Subscriptions"

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
				{/* <Route path="/editproduct/:id" element={<EditProduct />} />
					<Route path="/editcustomer/:id" element={<EditCustomer />} /> */}
				{/* <Route path="*" element={<NotFound />} /> */}
			</Routes>

			{location.pathname == "/" && (
				<h1 className="HomePageHeader">
					<span>Welcome to Cinema World</span>
					<span style={{ color: "#8187dc" }}>!</span>
				</h1>
			)}
		</div>
	)
}

export default App
