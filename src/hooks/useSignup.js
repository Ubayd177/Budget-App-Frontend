
import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const signUp = async (email,password)=> {
        setIsLoading(true)
        setError(null) // done everytime signing up so we start fresh with no errors and loading true

        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        const responseData = await response.json()
        if (!response.ok){
            setIsLoading(false)
            setError(responseData.error)
        }
        if (response.ok){
            localStorage.setItem('user', JSON.stringify(responseData))
            dispatch({type:'LOGIN', payload: responseData}) // after signing up successfully login
            setIsLoading(false)
        }

    }
    return { signUp, isLoading, error }
}