const initialValue = {
	loggedUser: {},
	users: [],
	members: [],
	movies: [],
	subscriptions: [],
}

const cinemaChanger = (state = initialValue, action) => {
	switch (action.type) {
		case "LOAD_USERS": {
			break
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
