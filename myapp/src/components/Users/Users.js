import { useState } from "react"
import { Button, Container } from "@mui/material"
import { AllUsers } from "./AllUsers"
import { AddUser } from "./AddUser"
import { useSelector } from "react-redux"

export const Users = () => {
	// const dispatch = useDispatch()
	const users = useSelector((state) => state.users)
	const [addUserBtn, setAddUserBtn] = useState(false)
	const [allUserBtn, setAllUserBtn] = useState(false)

	const changeShow = (buttonClicked) => {
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
						backgroundColor: allUserBtn ? "#4CAF50" : "#008080",
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
						backgroundColor: addUserBtn ? "#4CAF50" : "#008080",
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
