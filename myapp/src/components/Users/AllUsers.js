import { useState, useEffect } from "react"
import { Typography, Container } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import { User } from "./User"

export const AllUsers = ({ usersPromise }) => {
	const [users, setUsers] = useState([])

	//understand how the promise works
	useEffect(() => {
		usersPromise.then((resolvedUsers) => {
			setUsers(resolvedUsers)
		})
	}, [usersPromise])

	return (
		<div>
			<Container maxWidth="sm">
				<Typography
					sx={{ mt: 3, mb: 3, textAlign: "center" }}
					variant="h2"
					color="initial"
				>
					All Users
				</Typography>
				{users.map((user) => {
					return <User user={user} key={user.username} />
				})}
			</Container>
		</div>
	)
}
