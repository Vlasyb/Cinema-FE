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
import { AllMembers } from "./AllMembers"
import { AddMember } from "./AddMember"
import { useSelector, useDispatch } from "react-redux"

export const Subscriptions = () => {
	const dispatch = useDispatch()
	const members = useSelector((state) => state.members)
	const [addMemberBtn, setAddMemberBtn] = useState(false)
	const [allMemberBtn, setAllMemberBtn] = useState(false)

	const changeShow = (buttonClicked) => {
		if (buttonClicked == "all") {
			setAllMemberBtn(true)
			setAddMemberBtn(false)
		} else {
			setAddMemberBtn(true)
			setAllMemberBtn(false)
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
					All Members
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
					Add Member
				</Button>
			</Container>
			{allMemberBtn && <AllMembers moviesPromise={members} />}
			{addMemberBtn && <AddMember onCancel={changeShow} />}
		</div>
	)
}
