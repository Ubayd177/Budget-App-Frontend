
import { useState } from 'react'
import { useSignup } from "../hooks/useSignup"
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
    Box, Typography
} from '@mui/material'
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signUp, error, isLoading} = useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()

        await signUp(email, password) // running the useSignup hook
    }

    return(
        <Container maxWidth="lg" sx={{ '&': {display: 'flex', alignItems: 'center', justifyContent:'center'}}}>
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

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
                                <button className="submit-button" disabled={isLoading}>Sign Up</button>
                            </FormControl>
                            <FormHelperText variant="filled">{error && <div className="error">{error}</div>}</FormHelperText>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Container>

)
}

export default Signup