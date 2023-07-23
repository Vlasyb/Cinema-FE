import axios from "axios"

const initialValue = {
	loggedUser: {},
	users: [],
	members: [],
	movies: [],
	subscriptions: [],
}
const port = 8040

const cinemaChanger = (state = initialValue, action) => {
	switch (action.type) {
		case "LOAD_USERS": {
			const fetchUsers = async () => {
				try {
					const response = await axios.get(`http://localhost:${port}/users`, {
						withCredentials: true,
					})
					return response.data
				} catch (error) {
					// Handle any errors, such as displaying an error message or logging the error
					console.error("Error loading users:", error)
					return state // Return the current state if the request fails
				}
			}
			return {
				...state,
				users: fetchUsers(),
			}
		}
		case "LOAD_MOVIES": {
			break
		}
		case "LOAD_MEMBERS": {
			break
		}
		case "LOAD_SUBSCRIPTIONS": {
			break
		}
		case "SAVE_LOGGED_USER": {
			return { ...state, loggedUser: action.payload }
		}
		default:
			return state
	}
}

export default cinemaChanger
