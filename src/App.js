
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import AddAccounts from './pages/AddAccounts'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

import {useAuthContext} from "./hooks/useAuthContext";
import UpdateTransaction from "./CRUD/UpdateTransaction";


function App() {
    const { user } = useAuthContext()

  return (
    <div className="App">
    <BrowserRouter>
        <Navbar />
        <div className="pages">
            <Routes>
                <Route
                    path="/"
                    element={user ? <Dashboard/>: <Navigate to="/login"/>} //if trying to access without logging in redirect to login page
                />
                <Route
                    path="/update-transaction/:id"
                    element={user ? <UpdateTransaction/>: <Navigate to="/login"/>}
                />
                <Route
                    path="/add-accounts"
                    element={user ? <AddAccounts/>: <Navigate to="/login"/>}
                />
                <Route
                    path="/login"
                    element={!user ? <Login/> : <Navigate to="/"/>} // if logged in then navigate to home page else continue
                />
                <Route
                    path="/signup"
                    element={!user ? <Signup/> : <Navigate to="/"/>}
                />
            </Routes>
        </div>
    </BrowserRouter>
    </div>
  );
}

export default App;
