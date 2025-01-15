import React from 'react'
import { Box, Grid, TextField, Typography, Avatar, useTheme, Tabs, Tab } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const TransactionTable = () => {

    // Sample data for the Transactions table
    const rows = [
        { id: 1, transactionId: 'T001', destinationCountry: 'South Africa', amountZAR: '5000', status: 'Completed', gateway: 'PayPal', txnReferenceNumber: 'TXN12345', beneficiary: 'John Doe' },
        { id: 2, transactionId: 'T002', destinationCountry: 'USA', amountZAR: '15000', status: 'Pending', gateway: 'Stripe', txnReferenceNumber: 'TXN12346', beneficiary: 'Jane Smith' },
        { id: 3, transactionId: 'T003', destinationCountry: 'Canada', amountZAR: '12000', status: 'Completed', gateway: 'Visa', txnReferenceNumber: 'TXN12347', beneficiary: 'Samuel Jackson' },
        { id: 4, transactionId: 'T004', destinationCountry: 'Mexico', amountZAR: '25000', status: 'Failed', gateway: 'MasterCard', txnReferenceNumber: 'TXN12348', beneficiary: 'Carlos Rivera' },
        { id: 5, transactionId: 'T005', destinationCountry: 'South Africa', amountZAR: '3000', status: 'Completed', gateway: 'PayPal', txnReferenceNumber: 'TXN12349', beneficiary: 'Olivia Brown' },
    ];

    return (
        <DataGrid
            sx={{
                width: '70vw',
                marginTop:'10px',
                '& .MuiDataGrid-columnHeaders': {
                    '& .super-app-theme--header': {
                        backgroundColor: '#005099',
                        color: 'white',
                    }
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold', // Bold title for headers
                },
                '& .MuiDataGrid-cell': {
                    fontSize: '14px',
                },
                '& .MuiDataGrid-row:nth-of-type(even)': {
                    backgroundColor: '#f0f8ff', // Light blue for even rows
                },
                '& .MuiDataGrid-row:nth-of-type(odd)': {
                    backgroundColor: '#ffffff', // White for odd rows
                },
                '& .super-app-theme--header': {
                    fontSize: '16px',
                },
            }}
            columns={[
                {
                    field: 'id',
                    headerName: 'SNo',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'transactionId',
                    headerName: 'Transaction ID',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'destinationCountry',
                    headerName: 'Destination Country',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'amountZAR',
                    headerName: 'Amount (ZAR)',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'status',
                    headerName: 'Status',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'gateway',
                    headerName: 'Gateway',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'txnReferenceNumber',
                    headerName: 'Txn Reference Number',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'beneficiary',
                    headerName: 'Beneficiary',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'action',
                    headerName: 'Action',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                    renderCell: () => <button>View</button>, // Add any action button
                },
            ]}
            rows={rows}
            //@ts-ignore
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
    );
}

export default TransactionTable;
