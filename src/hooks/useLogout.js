import {useAuthContext} from "./useAuthContext";


export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const logout = () => {

        localStorage.removeItem('user')
        // when logging out we remove user object from the local storage

        dispatch({type: 'LOGOUT'}) // upon the dispatch call LOGOUT

    }
    return {logout}
}