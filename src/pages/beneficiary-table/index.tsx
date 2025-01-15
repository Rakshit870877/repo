import React from 'react'
import { Box, Grid, TextField, Typography, Avatar, useTheme, Tabs, Tab } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'

const BeneficiaryTable = () => {

    const navigate = useNavigate();

    // Sample data for the new columns
    const rows = [
        { id: 1, beneficiaryName: 'John Doe', accountNumber: '1234567890', bank: 'Bank of USA', bankCode: 'BOUSA1234',  lastTransaction: '2024-01-01' },
        { id: 2, beneficiaryName: 'Jane Smith', accountNumber: '0987654321', bank: 'South Africa Bank', bankCode: 'SAB1234SA', lastTransaction: '2023-12-15' },
        { id: 3, beneficiaryName: 'Samuel Jackson', accountNumber: '1122334455', bank: 'Global Bank', bankCode: 'GB112233',  lastTransaction: '2023-11-20' },
        { id: 4, beneficiaryName: 'Carlos Rivera', accountNumber: '6677889900', bank: 'Bank of Mexico', bankCode: 'BOMX2233',  lastTransaction: '2023-10-30' },
        { id: 5, beneficiaryName: 'Olivia Brown', accountNumber: '5544332211', bank: 'South Africa Bank', bankCode: 'SAB2233SA',  lastTransaction: '2023-09-25' },
    ];

    const ViewBeneficiaryDetails=()=>{
        navigate('/beneficiary-details')
    }

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
                    headerName: 'Sno',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'beneficiaryName',
                    headerName: 'Beneficiary Name',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'accountNumber',
                    headerName: 'Account Number',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'bank',
                    headerName: 'Bank',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'bankCode',
                    headerName: 'Bank Code',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                
                {
                    field: 'lastTransaction',
                    headerName: 'Last Transaction',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                },
                {
                    field: 'action',
                    headerName: 'Action',
                    flex: 1,
                    headerClassName: 'super-app-theme--header',
                    renderCell: () => <button onClick={ViewBeneficiaryDetails}>View</button>, // Add any action button
                },
            ]}
            rows={rows}
            //@ts-ignore
            pageSize={5}
            rowsPerPageOptions={[5]}
        />
    );
}

export default BeneficiaryTable;
