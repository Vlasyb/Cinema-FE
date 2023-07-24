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
import { AllUsers } from "./AllUsers"
import { AddUser } from "./AddUser"
import { useSelector, useDispatch } from "react-redux"

export const Users = () => {
	// const dispatch = useDispatch()
	const users = useSelector((state) => state.users)
	const [addUserBtn, setAddUserBtn] = useState(false)
	const [allUserBtn, setAllUserBtn] = useState(false)

	const changeShow = (buttonClicked) => {
		console.log("ChangeShow activated")
		if (buttonClicked == "all") {
			setAllUserBtn(true)
			setAddUserBtn(false)
		} else {
			setAddUserBtn(true)
			setAllUserBtn(false)
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
					All Users
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
					Add User
				</Button>
			</Container>
			{allUserBtn && <AllUsers usersPromise={users} />}
			{addUserBtn && <AddUser onCancel={changeShow} />}
		</div>
	)
}
