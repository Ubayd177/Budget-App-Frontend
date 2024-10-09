
import {Link} from 'react-router-dom'
import {useLogout} from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext"; // to access user email
import '../index.css'
const Navbar = () => {
        const { logout } = useLogout()
        const { user } = useAuthContext() // allows us to look at the data for user in component tree
    const handleClick = () => {
        logout()
    }
//only if user exists and logged in we display email and logout use user && ()
    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Home</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Logout</button>
                            <Link to="/add-accounts">Add Bank</Link>
                            <Link to="/view-balances">Net worth</Link>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}
export default Navbar