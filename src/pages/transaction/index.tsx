import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Grid, Typography, Chip, TextField, Drawer, ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate } from 'react-router-dom'
import { TransactionService } from '@/services/transaction.service'
import {
  TansactionOutwardCalculated,
  TransactionDetailsResponse,
  TransactionInward,
  TransactionInwardCalclulated,
  TransactionOutward,
} from '@/types/transaction.type'

const sampleInwardsData: Array<TransactionInwardCalclulated> = [
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
    ///Transaction

    transactionNumberIw: 'IW001',
    owTransactionNumber: 'T002',
    sendingCountry: 'US',
    receivingCountry: 'GB',
    settlementCurrency: 'USD',
    settlementAmount: 1000.5,
    reportingStatus: 'RS',
    destinationBankCode: 'BANKCODE01',
    beneficiaryId: 'B001',
    residenceCountry: 'USA',
    nationality: 'American',
    beneficiaryName: 'Alice Johnson',
    idType: 'Passport',
    idNumber: 'P123456789',
    physicalAddressLine1: '456 Oak St',
    physicalAddressLine2: 'Apt 7B',
    physicalAddressLine3: 'Floor 4',
    suburb: 'Uptown',
    city: 'New York',
    postCode: '10002',
    country: 'USA',
    bankName: 'XYZ Bank',
    bankBicCode: 'BIC123XYZ',
    sortCode: '678901',
    iban: 'US9876543210',
    profileStatus: true,
    sanctionStatus: false,
    fraudStatus: false,
    applicant: 'A001',
    activeStatus: true,
  },
]

const sampleOutwardsData: Array<TansactionOutwardCalculated> = [
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

    //transaction

    transactionNumber: 'T002',
    sendCountry: 'USA',
    receiveCountry: 'GBR',
    applicantId: 'A001',
    receiverId: 'B001',
    dealCoverNumber: 'D223456',
    exchangeRates: 1.3,
    principalCurrency: 'USD',
    principalAmount: 15000.0,
    settlementCurrency: 'GBP',
    settlementAmount: 19500.0,
    charges: 150.0,
    lcharges2: 75.0,
    destinationBankBicCode: 'BICCODE124',
    transactionStatus: 'ST',
    reportingStatus: 'RP',
    beneficiaryId: 'B001',
    residenceCountry: 'USA',
    nationality: 'American',
    beneficiaryName: 'Alice Johnson',
    idType: 'Passport',
    idNumber: 'P123456789',
    physicalAddressLine1: '456 Oak St',
    physicalAddressLine2: 'Apt 7B',
    physicalAddressLine3: 'Floor 4',
    suburb: 'Uptown',
    city: 'New York',
    postCode: '10002',
    country: 'USA',
    bankName: 'XYZ Bank',
    bankBicCode: 'BIC123XYZ',
    sortCode: '678901',
    iban: 'US9876543210',
    profileStatus: true,
    sanctionStatus: false,
    fraudStatus: false,
    applicant: 'A001',
    activeStatus: true,
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

    // { field: 'date', headerName: 'Date', flex: 1, headerClassName: 'super-app-theme--header' },
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

  const [transactionDetails, setTransactionDetails] = useState(null)
  const [transactionType, setTransactionType] = useState('inwards') // Default to 'inwards'

  const [inboundTransaction, setInboundTransaction] = useState<Array<TransactionInward>>([])
  const [outboundTransaction, setOutboundTransaction] = useState<Array<TransactionOutward>>([])
  const [transactionData, setTransactionData] = useState(inboundTransaction)

  const handleViewMore = (row) => {
    setTransactionDetails(row)
    setDrawerOpen(true)
  }

  let transaction_Service = new TransactionService()

  useEffect(() => {
    transaction_Service
      .gettransactions()
      .then((data: TransactionDetailsResponse) => {
        let inbound: Array<TransactionInwardCalclulated>[] = data?.transactionDetailsList.map((e) => {
          return {
            ...e.transactionInward,
            ...e.beneficiary,
            id: e?.transactionInward.transactionNumberIw,
            destination: e?.transactionInward?.receivingCountry,
            value: e?.transactionInward?.settlementAmount,
            currency: e?.transactionInward?.settlementCurrency,
            settlement: e?.transactionInward?.settlementAmount,
            destinationBank: e?.transactionInward?.destinationBankCode,
          }
        })

        let outbound: Array<TansactionOutwardCalculated>[] = data?.transactionDetailsList.map((e) => {
          return {
            ...e.transactionOutward,
            ...e.beneficiary,
            id: e?.transactionOutward.transactionNumber,
            destination: e?.transactionOutward?.receiveCountry,
            value: e?.transactionOutward?.settlementAmount,
            currency: e?.transactionOutward?.settlementCurrency,
            settlement: e?.transactionOutward?.settlementAmount,
            destinationBank: e?.transactionOutward?.destinationBankBicCode,
          }
        })
        setInboundTransaction(inbound)
        setTransactionData(inbound)
        setOutboundTransaction(outbound)
        console.log(inbound)
        console.log(outbound)
      })
      .catch((err) => {})
  }, [])

  const handleToggleTransactionType = (event, newType) => {
    if (newType) {
      setTransactionType(newType)
      setTransactionData(newType === 'inwards' ? inboundTransaction : outboundTransaction)
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
                <TextField label="Account Number" variant="filled" fullWidth defaultValue={transactionDetails?.iban} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Bank" variant="filled" fullWidth defaultValue={transactionDetails?.bankName} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Bank Code" variant="filled" fullWidth defaultValue={transactionDetails?.bankBicCode} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Account Holder Name"
                  variant="filled"
                  fullWidth
                  defaultValue={transactionDetails?.beneficiaryName}
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
