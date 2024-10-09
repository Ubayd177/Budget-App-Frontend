
import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import {
    Input,
    InputLabel,
    Button,
    TextField,
    FormControl,
    Container,
    FormLabel,
    Grid,
    FormHelperText,
    Box
} from '@mui/material'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password) // asynchronous calling the login function using the context
    }

    return(
            <Container maxWidth="lg" sx={{ '&': {display: 'flex', alignItems: 'center', justifyContent:'center'}}}>
                <form className="login" onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <div className="textfields">
                        <Grid container-spacing={10}>
                            <Grid item xs className="Grid-form">
                                <FormControl>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className="textfield"
                                        margin={"normal"}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs className="Grid-form">
                                <FormControl>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        className="textfield"
                                        margin={"normal"}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs className="Grid-form">
                                <FormControl>
                                    <button className="submit-button" disabled={isLoading}>Login</button>
                                </FormControl>
                                <FormHelperText variant="filled">{error && <div className="error">{error}</div>}</FormHelperText>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </Container>
    )
}

export default Login