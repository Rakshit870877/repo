import React, { useState } from 'react'
import { Box, Button, Typography, Chip, TextField, Grid, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useTheme } from '@emotion/react'

interface Transaction {
  id: string
  sourceCountry: string
  amount: number
  status: 'Pending' | 'Closed'
  details: {
    sender: {
      country: string
      currency: string
      amount: number
      name: string
      contact: string
      reporting: string
      bopCategory: number
    }
    receiver: {
      country: string
      currency: string
      amount: number
      name: string
      contact: string
    }
  }
}

const theme = useTheme()
const transactionsData: Transaction[] = [
  {
    id: 'INSA0023',
    sourceCountry: 'INDIA',
    amount: 2000,
    status: 'Closed',
    details: {
      sender: {
        country: 'INDIA',
        currency: 'INR',
        amount: 9482.55,
        name: 'SHIVANSH MATHUR',
        contact: '+91 9999888822',
        reporting: 'REPORTED TO RBI',
        bopCategory: 417,
      },
      receiver: {
        country: 'SOUTH AFRICA',
        currency: 'ZAR',
        amount: 2000,
        name: 'KYLE',
        contact: '+91 9999888822',
      },
    },
  },
  {
    id: 'UKSA0089',
    sourceCountry: 'United Kingdom',
    amount: 23000,
    status: 'Pending',
    details: {
      sender: {
        country: 'UK',
        currency: 'GBP',
        amount: 23000,
        name: 'JOHN DOE',
        contact: '+44 1234567890',
        reporting: 'REPORTED TO BOE',
        bopCategory: 419,
      },
      receiver: {
        country: 'SOUTH AFRICA',
        currency: 'ZAR',
        amount: 23000,
        name: 'JANE DOE',
        contact: '+91 8888888888',
      },
    },
  },
]

const TransactionPage: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const theme = useTheme()
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Transaction ID',
      headerClassName: 'super-app-theme--header',
      flex: 1,
    },
    {
      field: 'sourceCountry',
      headerName: 'Source Country',
      flex: 1,

      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'amount',
      headerName: 'Amount (ZAR)',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    { field: 'status', headerName: 'Status', flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => {
            setSelectedTransaction(transactionsData.find((t) => t.id === params.row.id) || null)
            setIsModalOpen(true)
          }}
        >
          View More
        </Button>
      ),
    },
  ]

  const rows = transactionsData.map((transaction) => ({
    id: transaction.id,
    sourceCountry: transaction.sourceCountry,
    amount: transaction.amount,
    status: transaction.status,
  }))

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTransaction(null)
  }

  return (
    <Box
      sx={{
        // height: '100vh',
        width: '73vw',
        padding: 2,
        '& .super-app-theme--header': {
          backgroundColor: '#005099',
          color: 'white',
        },
        // backgroundColor: theme.palette.primar,
      }}
    >
      {/* DataGrid Section */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        sx={{
          width: '100%', // Make DataGrid fill the entire width
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            whiteSpace: 'nowrap', // Prevent text overflow
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          '@media (max-width: 600px)': {
            '& .MuiDataGrid-root': {
              fontSize: '0.8rem', // Adjust font size for small screens
            },
          },
        }}
      />

      {/* Modal for Transaction Details */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ backgroundColor: theme.palette.primary.main, color: '#fff', textAlign: 'center' }}>Transaction Details</DialogTitle>
        <DialogContent>
          {selectedTransaction && (
            <Box>
              {/* Transaction ID and Status */}
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Transaction ID: {selectedTransaction.id}</Typography>
                <Chip label={selectedTransaction.status} color={selectedTransaction.status === 'Pending' ? 'warning' : 'success'} />
              </Box>
              <Divider sx={{ my: 2 }} />

              {/* Sender Details */}
              <Typography variant="subtitle1" fontWeight="bold">
                Sender Details:
              </Typography>
              <Typography>Country: {selectedTransaction.details.sender.country}</Typography>
              <Typography>Name: {selectedTransaction.details.sender.name}</Typography>
              <Typography>
                Amount: {selectedTransaction.details.sender.amount} {selectedTransaction.details.sender.currency}
              </Typography>
              <Typography>Contact: {selectedTransaction.details.sender.contact}</Typography>
              <Typography>Reporting: {selectedTransaction.details.sender.reporting}</Typography>
              <Divider sx={{ my: 2 }} />

              {/* Receiver Details */}
              <Typography variant="subtitle1" fontWeight="bold">
                Receiver Details:
              </Typography>
              <Typography>Country: {selectedTransaction.details.receiver.country}</Typography>
              <Typography>Name: {selectedTransaction.details.receiver.name}</Typography>
              <Typography>
                Amount: {selectedTransaction.details.receiver.amount} {selectedTransaction.details.receiver.currency}
              </Typography>
              <Typography>Contact: {selectedTransaction.details.receiver.contact}</Typography>
              <Divider sx={{ my: 2 }} />

              {/* Confirm BOP Category */}
              <Typography variant="subtitle1" fontWeight="bold">
                Confirm BOP Category
              </Typography>
              <Grid container spacing={2} alignItems="center" mt={1}>
                <Grid item xs={6}>
                  <TextField
                    label="From Sender"
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue={selectedTransaction.details.sender.bopCategory}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="From Receiver"
                    variant="outlined"
                    size="small"
                    fullWidth
                    defaultValue={selectedTransaction.details.sender.bopCategory}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />

              {/* Confirm Button */}
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => console.log('Confirm clicked')}>
                Confirm
              </Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default TransactionPage
