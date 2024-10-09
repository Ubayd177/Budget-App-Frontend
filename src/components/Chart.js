

import { Chart } from "react-google-charts";
import { useAuthContext } from "../hooks/useAuthContext"; // to access user email
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Container} from "@mui/material";

const TransactionChart = () => {
    const {user} = useAuthContext()
    const [transactions, setTransactions] = useState([])
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const getTransactionsForCharts = async () => {
            const config = {
                headers: {Authorization: `Bearer ${user.token}`},
            }
            try {
                const grouped = {} // using memo
                const transactions = await axios.get('/api/transactions', config)
                const data = await transactions.data
                const removeNegative = data.filter((transaction) => transaction.amount >= 0)// this will remove any incomings
                removeNegative.forEach((transaction) => { // filter negatives out
                    const category = transaction.personalFinanceCategory
                    const amount = transaction.amount
                    if (!grouped[category]) {
                        grouped[category] = 0;
                    }
                    grouped[category] += amount
                    }) // if the category does not exist yet then add to array

                const groupedTransactions = [
                    ['Category', 'Amount'],
                    ...Object.entries(grouped).map(([category, amounts]) => [category,amounts])]
                setChartData(groupedTransactions)
            } catch (error) {
                console.log(error)
            }

        }
        getTransactionsForCharts()
    }, [user])

    const options = {
        colors: ['#1E0342', '#0E46A3','#9AC8CD','#E1F7F5', '#5356FF','#11009E','#474F7A','#81689D']
}
    return (
        <div style={{ display: 'flex'}}>
            {chartData.length > 0 ? (
                <>
                        <Chart
                            chartType="PieChart"
                            data={chartData}
                            width="90%"
                            height="400px"
                            options={options}
                        />
                        <Chart
                            chartType="BarChart"
                            data={chartData}
                            width="90%"
                            height="400px"
                            options={options}
                        />
                </>

            ) : (
                    <p>No Charts </p>
                )}
        </div>
    )
}

export default TransactionChart