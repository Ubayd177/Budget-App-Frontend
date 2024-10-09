import React, { useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

import { useAuthContext } from '../hooks/useAuthContext'
import {Button, Container, Box, Grid, Typography} from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
axios.defaults.baseURL = 'http://localhost:4000';

const ConnectBank = () => {
    const { user } = useAuthContext()
    const [token, setLinkToken] = useState(null);
    const [publicToken, setPublicToken] = useState(null);

    useEffect(() => {
        const createLinkToken = async() => {
                const config = {
                    headers: {Authorization: `Bearer ${user.token}`},
                }
                const response = await axios.post('api/plaid-link/create_link_token', null, config);
                setLinkToken(response.data.link_token);
        }
        if (user){
            createLinkToken();
        }
    }, [user]);

    const onSuccess = async (public_token, metadata) => {
        setPublicToken(public_token);
        console.log('Public token:', public_token);
        const config = {
            headers: {Authorization: `Bearer ${user.token}`},
        }
            const accessTokenResponse = await axios.post('api/plaid-link/exchange_public_token', {
                public_token
            },config);
            const accessToken = accessTokenResponse.data.access_token;
            console.log('Transactions saved successfully.');
        }



    const { open, ready } = usePlaidLink({
        token,
        onSuccess,
    });

    return publicToken ? (
        <Container maxWidth="lg">
            <Typography>{"Transactions: "}</Typography>
        </Container>
    ) : (
        <Grid className="bankinstitution">
            <AccountBalanceIcon sx={{m: 3}}></AccountBalanceIcon>
            <Grid item cs={3}>
                <Button variant="contained" onClick={() => open()} disabled={!ready}>
                    Connect new Bank Institution
                </Button>
            </Grid>
        </Grid>
    );
};

export default ConnectBank;


