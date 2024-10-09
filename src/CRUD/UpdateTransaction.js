
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuthContext} from "../hooks/useAuthContext";
import {Input, InputLabel, Button, TextField, FormControl, Container, FormLabel} from '@mui/material'
import { useParams, useNavigate } from "react-router-dom" // allows us to use the url to update





axios.defaults.baseURL = 'http://localhost:4000';
const UpdateTransaction = () => {
    const { user } = useAuthContext()
    const {id} = useParams()
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [date, setTheDate] = useState()
    const navigate = useNavigate()


    useEffect(() => {
        const config = {
            headers: {Authorization: `Bearer ${user.token}`},
        }
        axios.get('/api/transactions/'+id, config).then(transaction =>
        {   setName(transaction.data.name)
            setAmount(transaction.data.amount)
            setTheDate(transaction.data.date)
        }
        )
            .catch(error => console.log(error))
    }, []);

    const onUpdate = (e) => {
        e.preventDefault()
        const config = {
            headers: {Authorization: `Bearer ${user.token}`},
        }
        try {
            axios.patch('/api/transactions/'+id, {name, amount, date}, config)
            navigate("/")
        } catch (error) {
            console.log(error)
        }

    }

    return(
        <Container maxWidth="lg">
            <form className="updateTransaction" onSubmit={onUpdate}>
                <h3>Update Transaction</h3>
                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Merchant Name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                        margin={"normal"}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <TextField
                        label="Amount"
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        required
                        margin={"normal"}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormLabel>Date</FormLabel>
                    <Input
                        type="date"
                        onChange={(e) => setTheDate(e.target.value)}
                        value={date}
                    />
                </FormControl>
                <Button variant="contained" type="submit">Update</Button>
            </form>
        </Container>

    )
}


export default UpdateTransaction
