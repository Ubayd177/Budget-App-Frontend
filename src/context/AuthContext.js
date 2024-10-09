

import {createContext, useEffect, useReducer} from 'react'


export const AuthContext = createContext()
// this will wrap our entire application


export const authReducer = (state, action) => {
    //state actions for logging in and out
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload } //completing the login sequence
            // payload is the user we get back
        case 'LOGOUT':
            return { user: null } // going over and overwritten
        default:
            return state
    }
}

// getting children
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    }) //stores email here and dispatches with action LOGIN or SIGNUP

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) // receives user null or the email password token

        if (user) {
            dispatch({type: "LOGIN", payload: user}) // we then dispatch to local storage only if available user so whenever you refresh it wont be set to null
        }
    }, []);


    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}