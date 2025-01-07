import React, { useState } from 'react'
import { Box, Button, Drawer, Grid, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Divider, useTheme, Avatar } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
// import { theme } from '@/contants/theme'
const mockData = [
  {
    id: 1,
    kycId: 'KYCIN0012',
    customerName: 'Chakshu Chopra',
    nationality: 'Indian',
    residentCountry: 'South Africa',
    idProof: 'Passport',
    addressProof: 'Utility Bill',
    verificationStatus: 'Pending',
    dob: '1990-05-20',
    phone: '+91 1234567890',
    email: 'chakshu@gmail.com',
    address: '123, Victoria Street, South Africa',
    kycSubmittedOn: '2024-01-01',
    verifiedOn: 'N/A',
    comments: 'Under review for address proof.',
  },
  {
    id: 2,
    kycId: 'KYCIN0013',
    customerName: 'John Doe',
    nationality: 'American',
    residentCountry: 'USA',
    idProof: 'Driving License',
    addressProof: 'Tax Document',
    verificationStatus: 'Verified',
    dob: '1985-07-15',
    phone: '+1 9876543210',
    email: 'john.doe@gmail.com',
    address: '456, Elm Street, New York, USA',
    kycSubmittedOn: '2024-01-15',
    verifiedOn: '2024-01-20',
    comments: 'All documents verified successfully.',
  },
]

const KYCPage = () => {
  const theme = useTheme()
  const [filterValues, setFilterValues] = useState({
    kycId: '',
    verificationStatus: '',
    country: '',
  })
  const [filteredData, setFilteredData] = useState(mockData)
  const [selectedKYC, setSelectedKYC] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const filtered = mockData.filter((item) => {
      return (
        (filterValues.kycId === '' || item.kycId.includes(filterValues.kycId)) &&
        (filterValues.verificationStatus === '' || item.verificationStatus === filterValues.verificationStatus) &&
        (filterValues.country === '' || item.residentCountry === filterValues.country)
      )
    })
    setFilteredData(filtered)
  }

  const openDrawer = (row: any) => {
    setSelectedKYC(row)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setSelectedKYC(null)
    setIsDrawerOpen(false)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        <strong>Know-Your Customer</strong>
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={4}>
          <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#000',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                // Class for the border around the input field
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#2e2e2e',
                  borderWidth: '2px',
                },
              },
              // Class for the label of the input field
              '& .MuiInputLabel': {
                color: 'red',
                fontWeight: 'bold',
              },
            }}
            sx={{
              // Label
              '& .MuiInputLabel-standard': {
                // color: theme.palette.primary.main,
                fontWeight: 'bold',
                '&.Mui-focused': {
                  color: ' theme.palette.primary.main',

                  fontSize: '20px',
                  //   fontWeight: '400px',
                },
              },
            }}
            variant="standard"
            fullWidth
            label="KYC ID"
            value={filterValues.kycId}
            onChange={(e) => handleFilterChange('kycId', e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Verification Status"
            variant="standard"
            select
            value={filterValues.verificationStatus}
            onChange={(e) => handleFilterChange('verificationStatus', e.target.value)}
            sx={{
              // Label
              '& .MuiInputLabel-standard': {
                // color: theme.palette.primary.main,
                fontWeight: 'bold',
                '&.Mui-focused': {
                  color: ' theme.palette.primary.main',

                  fontSize: '20px',
                  //   fontWeight: '400px',
                },
              },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Verified">Verified</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Country"
            variant="standard"
            select
            value={filterValues.country}
            sx={{
              // Label
              '& .MuiInputLabel-standard': {
                // color: theme.palette.primary.main,
                fontWeight: 'bold',
                '&.Mui-focused': {
                  color: ' theme.palette.primary.main',

                  fontSize: '20px',
                  //   fontWeight: '400px',
                },
              },
            }}
            onChange={(e) => handleFilterChange('country', e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="South Africa">South Africa</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={applyFilters}>
        Apply Filters
      </Button>

      {/* Data Grid */}
      <Box
        marginTop={2}
        sx={{
          width: '73vw',

          '& .super-app-theme--header': {
            backgroundColor: '#005099',
            color: 'white',
          },
        }}
      >
        <DataGrid
          sx={{
            width: '100%',
          }}
          rows={filteredData}
          columns={[
            {
              field: 'id',
              headerName: 'S. No',
              flex: 1,

              headerClassName: 'super-app-theme--header',
            },
            {
              field: 'kycId',
              headerName: 'KYC ID',
              flex: 1,
              headerClassName: 'super-app-theme--header',
            },
            {
              field: 'customerName',
              headerName: 'Customer Name',
              flex: 1,
              headerClassName: 'super-app-theme--header',
            },
            {
              field: 'nationality',
              headerName: 'Nationality',
              flex: 1,

              headerClassName: 'super-app-theme--header',
            },
            { field: 'residentCountry', headerName: 'Resident Country', flex: 1, headerClassName: 'super-app-theme--header' },
            { field: 'idProof', headerName: 'ID Proof', flex: 1, headerClassName: 'super-app-theme--header' },
            { field: 'addressProof', headerName: 'Address Proof', flex: 1, headerClassName: 'super-app-theme--header' },
            {
              field: 'verificationStatus',
              headerName: 'Verification Status',
              flex: 1,
              headerClassName: 'super-app-theme--header',
            },
            {
              field: 'action',
              headerName: 'Action',
              flex: 1,
              headerClassName: 'super-app-theme--header',
              renderCell: (params) => (
                <Button variant="outlined" onClick={() => openDrawer(params.row)}>
                  View More
                </Button>
              ),
            },
          ]}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

      {/* Full-Screen Drawer */}

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: '70%', height: '100%', padding: 4 },
        }}
      >
        <Box>
          <Box p={3}>
            {/* Header */}
            <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="h5"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  p: '0.5%',
                  color: 'white',
                  borderRadius: '10px',
                }}
              >
                KYC ID - KYCIN0012
              </Typography>
              <Typography variant="subtitle1" style={{ backgroundColor: '#FFEEBA', padding: '4px 8px', borderRadius: '4px' }}>
                Pending
              </Typography>
            </Box>

            {/* Applicant Details Section */}
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Typography variant="h6" gutterBottom>
                  <strong> Applicant Details</strong>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField label="Customer Name" variant="filled" defaultValue="Chakshu Chopra" />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Nationality" variant="filled" defaultValue="Indian" />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Residence Country" variant="filled" defaultValue="South Africa" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Permanent Address</Typography>
                    <TextField label="Address" fullWidth defaultValue="Indian" />
                    <Grid container spacing={2} mt={1}>
                      <Grid item xs={3}>
                        <TextField label="City" fullWidth defaultValue="South Africa" />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="State" fullWidth defaultValue="South Africa" />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Zip Code" fullWidth defaultValue="South Africa" />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Country" fullWidth defaultValue="South Africa" />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'grey',
                        marginbutton: '2%',
                      }}
                    >
                      Permanent Address
                    </Typography>
                    <TextField label="Address" fullWidth defaultValue="Indian" />
                    <Grid container spacing={2} mt={1}>
                      <Grid item xs={3}>
                        <TextField label="City" fullWidth defaultValue="South Africa" />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="State" fullWidth defaultValue="South Africa" />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Zip Code" fullWidth defaultValue="South Africa" />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField label="Country" fullWidth defaultValue="South Africa" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Box width={100} height={100} border="2px solid #000" borderRadius="50%" display="flex" alignItems="center" justifyContent="center">
                  <Typography>Applicant Picture</Typography>
                </Box>
                <Typography mt={2} color="green">
                  Matched with ID Proof
                </Typography>
              </Grid>
            </Grid>

            {/* KYC Status Section */}
            <Box mt={4}>
              <Typography variant="h6">KYC Status</Typography>
              {['ID Proof', 'Address Proof', 'Income Proof'].map((proofType) => (
                <Grid container spacing={2} alignItems="center" mt={1} key={proofType}>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel>ID Type</InputLabel>
                      <Select defaultValue="Passport">
                        <MenuItem value="Passport">Passport</MenuItem>
                        <MenuItem value="ID Card">ID Card</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField label="Verification Type" fullWidth defaultValue="Auto (Sybrin)" />
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined">Uploaded</Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      style={{
                        backgroundColor: proofType === 'ID Proof' ? '#C8E6C9' : proofType === 'Address Proof' ? '#FFEEBA' : '#FFCDD2',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        textAlign: 'center',
                      }}
                    >
                      {proofType === 'ID Proof' ? 'Verified' : proofType === 'Address Proof' ? 'Pending' : 'Failed'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Additional Comments" fullWidth defaultValue="comment" />
                  </Grid>
                </Grid>
              ))}
            </Box>

            {/* Buttons */}
            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 8 }}
                onClick={() => {
                  setIsDrawerOpen(false)
                }}
              >
                Save
              </Button>
              <Button variant="contained" color="success">
                Save and Verify
              </Button>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default KYCPage
