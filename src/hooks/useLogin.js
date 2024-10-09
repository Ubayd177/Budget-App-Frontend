
import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const login = async (email,password)=> {
        setIsLoading(true)
        setError(null) // done everytime signing up so we start fresh with no errors and loading true

        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}) // this will post to our server to get login api from user route
        })
        const responseData = await response.json()
        if (!response.ok){
            setIsLoading(false)
            setError(responseData.error)
        }
        if (response.ok){
            localStorage.setItem('user', JSON.stringify(responseData))
            dispatch({type:'LOGIN', payload: responseData}) // actually initiate the login
            setIsLoading(false)
        }

    }
    return { login, isLoading, error }
}