const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload
            }
        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [
                        ...state.user.followings,
                        action.payload
                    ]
                }
            }
        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter(friendId => (friendId !== action.payload))
                }
            }
        case "LOGOUT":
            return {
                // user: localStorage.setItem("user", null),
                user: null,
                //change the  code user:localStorage.setItem("user", null) to  user: null
                //localstorage was setting 'user' to 'undefined' which was causing error
                isFetching: false,
                error: false
            };
        default:
            return state
    }
}

export default AuthReducer