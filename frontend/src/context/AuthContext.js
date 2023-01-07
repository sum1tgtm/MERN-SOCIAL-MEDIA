import { createContext, useReducer, useEffect } from "react"
import AuthReducer from './AuthReducer'

// const INITIAL_STATE = {
//     user: null,
//     isFetching: false,
//     error: false
// }

// MODIFY INTIAL_STATE
const INITIAL_STATE = {
    // user: JSON.parse(localStorage.getItem("user")) || null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isfetching: false,
    error: false,
}

// ADD USEEFFECT
// useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(state.user));
// }, [state.user]);   


export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}