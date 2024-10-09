
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuthContext} from "../hooks/useAuthContext";
import { Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Container, Button} from '@mui/material'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TransactionChart from "../components/Chart";

axios.defaults.baseURL = 'http://localhost:4000';

const Dashboard = () => {
    const { user } = useAuthContext()
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        const getTransactions = async () => {
            const config = {
                headers: {Authorization: `Bearer ${user.token}`},
            }
            try {
                const response = await axios.get('/api/transactions', config)
                const data = await response.data
                setTransactions(data)
            } catch (error) {
                console.log(error)
            }


        }
        getTransactions()
    },[user])

    const deleteTransaction = async (id) => {
        const config = {
            headers: {Authorization: `Bearer ${user.token}`},
        }
        try {
            const response = await axios.delete('/api/transactions/'+id, config) //Call the api to delete the transaction based on the id
            console.log(response)
            window.location.reload() //refreshes the page
        } catch (error) {
            console.log("Not Authorized", error)
        }
    }

    return (
        <>
            <TransactionChart/>
            <Container maxWidth="lg">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Merchant Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Pending</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions && transactions.map((transaction) => {
                            return (
                                <TableRow>
                                    <TableCell>{transaction.name}</TableCell>
                                    <TableCell>{transaction.amount} {transaction.currencyCode}</TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.personalFinanceCategory}</TableCell>
                                    <TableCell>{transaction.pendingTransactionId}</TableCell>
                                    <TableCell>
                                        <Link to={`/update-transaction/${transaction._id}`}><EditIcon className="edit-pen"/></Link>
                                        <button className="delete-bin" onClick={(e) => deleteTransaction(transaction._id)}><DeleteIcon></DeleteIcon></button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Container>
        </>

    )
}


export default Dashboard
