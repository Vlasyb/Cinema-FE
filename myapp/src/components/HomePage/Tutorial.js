import React from "react"
import { Stack, ListItem } from "@mui/material"

export const Tutorial = () => {
	return (
		<div>
			<div
				style={{ marginTop: "6em", display: "flex", justifyContent: "center" }}
			>
				<Stack sx={{ fontSize: "30px" }} direction="row">
					<ListItem sx={{ textAlign: "center" }}>Manage Members</ListItem>
					<ListItem sx={{ textAlign: "center" }}>Manage Movies</ListItem>
					<ListItem sx={{ textAlign: "center" }}>
						Subscribe Members To Movies
					</ListItem>
				</Stack>
			</div>
		</div>
	)
}
