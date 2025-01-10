import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  Chip,
  TextField,
  Drawer,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Navigate, useNavigate } from 'react-router-dom'

const sampleInwardsData = [
  {
    id: 'IMP11231',
    destination: 'USA',
    value: 1000,
    currency: 'USD',
    settlement: '2025-01-01',
    destinationBank: 'Bank of America',
    reportedToSARB: 'Yes',
    date: '2025-01-02',
    holderName: 'Siddhant kaushik',
    accountNumber: '23322 23232 2323 343434',
    bankCode: 'IC2345',
  },
  {
    id: 'IMP11232',
    destination: 'UK',
    value: 1500,
    currency: 'GBP',
    settlement: '2025-01-02',
    destinationBank: 'HSBC',
    reportedToSARB: 'No',
    date: '2025-01-03',
    holderName: 'Siddhant kaushik',
    accountNumber: '23322 23232 2323 343434',
    bankCode: 'IC2345',
  },
]

const sampleOutwardsData = [
  {
    id: 'IMP11235',
    destination: 'India',
    value: 2000,
    currency: 'INR',
    settlement: '2025-01-04',
    destinationBank: 'ICICI Bank',
    reportedToSARB: 'Yes',
    date: '2025-01-05',
    holderName: 'Siddhant kaushik',
    accountNumber: '23322 23232 2323 343434',
    bankCode: 'IC2345',
  },
  {
    id: 'IMP11239',
    destination: 'Germany',
    value: 2500,
    currency: 'EUR',
    settlement: '2025-01-06',
    destinationBank: 'Deutsche Bank',
    reportedToSARB: 'No',
    date: '2025-01-07',
    holderName: 'Siddhant kaushik',
    accountNumber: '23322 23232 2323 343434',
    bankCode: 'IC2345',
  },
]

const TransactionPage = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Transaction ID', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'destination', headerName: 'Destination', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'value', headerName: 'Value', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'currency', headerName: 'Currency', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'settlement', headerName: 'Settlement', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'destinationBank', headerName: 'Destination Bank', flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: 'reportedToSARB',
      headerName: 'Reported to SARB',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => <Chip label={params.value} color={params.value === 'Yes' ? 'success' : 'error'} variant="outlined" size="small" />,
    },
    { field: 'date', headerName: 'Date', flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        // <Button variant="contained" color="primary" onClick={() => handleViewMore(params.row)}>
        //   View More
        // </Button>
        <Button variant="contained" color="primary" startIcon={<VisibilityIcon />} onClick={() => handleViewMore(params.row)}>
          View More
        </Button>
      ),
    },
  ]

  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const [transactionData, setTransactionData] = useState(sampleInwardsData)
  const [transactionDetails, setTransactionDetails] = useState(null)
  const [transactionType, setTransactionType] = useState('inwards') // Default to 'inwards'

  const handleViewMore = (row) => {
    setTransactionDetails(row)
    setDrawerOpen(true)
  }

  const handleToggleTransactionType = (event, newType) => {
    if (newType) {
      setTransactionType(newType)
      setTransactionData(newType === 'inwards' ? sampleInwardsData : sampleOutwardsData)
    }
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        <strong>Transactions</strong>
      </Typography>
      <ToggleButtonGroup value={transactionType} exclusive onChange={handleToggleTransactionType} sx={{ mb: 2 }}>
        <ToggleButton value="inwards" sx={{ backgroundColor: '#005099', color: 'white' }}>
          Inwards
        </ToggleButton>
        <ToggleButton value="outwards" sx={{ backgroundColor: '#005099', color: 'white' }}>
          Outwards
        </ToggleButton>
      </ToggleButtonGroup>

      <Box
        marginTop={2}
        sx={{
          width: '80vw',

          '& .super-app-theme--header': {
            backgroundColor: '#005099',
            color: 'white',
          },
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              alignSelf: 'flex-end',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                marginBottom: '10%',
              }}
              onClick={(e) => {
                // console.log()
                navigate('/sendmoney')
              }}
            >
              + Transaction
            </Button>
          </div>
        </div>

        <DataGrid
          rows={transactionData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{
            '& .MuiDataGrid-root': {
              border: '1 px solid blue',
            },
            '& .MuiDataGrid-cell': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
        />
      </Box>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={closeDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: '60%',
            padding: 2,
            backgroundColor: 'white',
          },
        }}
      >
        {transactionDetails && (
          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                marginBottom: 2,
                color: 'white',
                textAlign: 'center',
                backgroundColor: theme.palette.primary.main,
                width: '20%',
                padding: '1%',
                borderRadius: '3%',
              }}
            >
              TRN ID- {transactionDetails.id}
            </Typography>
            <Chip label="Pending" color="warning" sx={{ marginBottom: 2 }} />
            <Divider sx={{ my: 2 }} />

            {/* Transaction Details Section */}
            <Typography variant="subtitle1" fontWeight="bold" sx={{ marginBottom: 2 }}>
              Transaction Details
            </Typography>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Destination" variant="filled" fullWidth defaultValue={transactionDetails.destination} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Value" variant="filled" fullWidth defaultValue={transactionDetails.value} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Currency" variant="filled" fullWidth defaultValue={transactionDetails.currency} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Date" variant="filled" fullWidth defaultValue={transactionDetails.date} size="small" disabled />
              </Grid>
            </Grid>

            {/* Beneficiary Details Section */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight="bold" sx={{ marginBottom: 2 }}>
              Beneficiary Details
            </Typography>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Account Number" variant="filled" fullWidth defaultValue={transactionDetails?.accountNumber} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Bank" variant="filled" fullWidth defaultValue={transactionDetails?.destinationBank} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Bank Code" variant="filled" fullWidth defaultValue={transactionDetails?.bankCode} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Account Holder Name"
                  variant="filled"
                  fullWidth
                  defaultValue={transactionDetails?.holderName}
                  size="small"
                  disabled
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            {/* <Button variant="contained" color="primary" onClick={closeDrawer}>
              Close
            </Button> */}
          </Box>
        )}
      </Drawer>
    </Box>
  )
}

export default TransactionPage
