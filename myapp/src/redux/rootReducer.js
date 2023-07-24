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
			const fetchMovies = async () => {
				try {
					const response = await axios.get(`http://localhost:${port}/movies`, {
						withCredentials: true,
					})
					return response.data
				} catch (error) {
					// Handle any errors, such as displaying an error message or logging the error
					console.error("Error loading movies:", error)
					return state // Return the current state if the request fails
				}
			}
			return {
				...state,
				movies: fetchMovies(),
			}
		}
		case "LOAD_MEMBERS": {
			const fetchMembers = async () => {
				try {
					const response = await axios.get(`http://localhost:${port}/members`, {
						withCredentials: true,
					})
					return response.data
				} catch (error) {
					// Handle any errors, such as displaying an error message or logging the error
					console.error("Error loading members:", error)
					return state // Return the current state if the request fails
				}
			}
			return {
				...state,
				members: fetchMembers(),
			}
		}
		case "LOAD_SUBSCRIPTIONS": {
			const fetchSubscriptions = async () => {
				try {
					const response = await axios.get(
						`http://localhost:${port}/subscriptions`,
						{
							withCredentials: true,
						}
					)
					return response.data
				} catch (error) {
					// Handle any errors, such as displaying an error message or logging the error
					console.error("Error loading subscriptions:", error)
					return state // Return the current state if the request fails
				}
			}
			return {
				...state,
				subscriptions: fetchSubscriptions(),
			}
		}
		case "SAVE_LOGGED_USER": {
			return { ...state, loggedUser: action.payload }
		}
		case "VERIFY_AND_GET_LOGGED_USER": {
			const fetchVerify = async () => {
				try {
					const response = await axios.get(
						`http://localhost:${port}/users/verify`,
						{
							withCredentials: true,
						}
					)
					return response.data
				} catch (error) {
					// Handle any errors, such as displaying an error message or logging the error
					console.log("Error loading logged user:", error)
					return {} // Return the current state if the request fails
				}
			}
			return {
				...state,
				loggedUser: fetchVerify(),
			}
		}
		default:
			return state
	}
}

export default cinemaChanger
