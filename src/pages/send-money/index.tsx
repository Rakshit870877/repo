import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  LinearProgress,
  Radio,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  InputAdornment,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'
import { DataGrid, GridColDef, GridRenderCellParams, GridRowsProp } from '@mui/x-data-grid'
import VerifiedIcon from '@mui/icons-material/Verified'
import PaymentMethodsTable from '@/components/paymentmethod'
import BeneficiaryForm from '@/components/benificeary'
import { ApplicantService } from '@/services/applicant.service'
import { Beneficiary } from '@/types/transaction.type'
import { TransactionService } from '@/services/transaction.service'
import GifModal from '@/components/successModal'

const users = [
  {
    id: 1,
    name: 'John Doe',
    accountNumber: '12345678',
    profilePhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    accountNumber: '87654321',
    profilePhoto: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 3,
    name: 'Jack Johnson',
    accountNumber: '11223344',
    profilePhoto: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 4,
    name: 'Jill Brown',
    accountNumber: '44332211',
    profilePhoto: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 5,
    name: 'James Dean',
    accountNumber: '55667788',
    profilePhoto: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
]
const countries = [
  { code: 'US', name: 'United States', currency: 'USD', forexRate: '0.043', flag: 'https://flagcdn.com/us.svg' },
  { code: 'IN', name: 'India', currency: 'INR', forexRate: '4.57', flag: 'https://flagcdn.com/in.svg' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', forexRate: '0.053', flag: 'https://flagcdn.com/gb.svg' },
  // { code: 'ZA', name: 'South Africa', currency: 'ZAR', forexRate: '4.7', flag: 'https://flagcdn.com/za.svg' }, // Added South Africa
]

const paymentGateways = [
  {
    id: 1,
    name: 'PayPal',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Paypal.svg',
  },
  {
    id: 2,
    name: 'Stripe',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Stripe_logo.png',
  },
  {
    id: 3,
    name: 'Square',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Square_logo.svg',
  },
  {
    id: 4,
    name: 'Razorpay',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Razorpay_logo.png',
  },
]


const SendMoneyPage = () => {
  const [searchText, setSearchText] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [tabValue, setTabValue] = useState('1')
  const[selectedTime,setSelectedTime]=useState({})
  const [selectedTimeTableRow, setSelectedTimeTableRow] = useState<number | null>(null)
  const[finalamount,setFinalAmount]=useState(0)
  const[sourceCountry,setSourceCountry]=useState('ZAR')
  const[gatewayCharge,  setGatewayCharge]=useState(0)
  const[selectedBenficary,setSelectedBenificary]=useState({})
  const[userlist,setUserList]=useState([])
  const[benficiary,setbenificiary]=useState<Array<any>>([])
  const[gifsuccess,setGifSuccess]=useState(false)
//   const[selected ]


  const [selecteTimeChange,setSelectedTimeCharge]=useState<number|null>(null)



  const [selectedUser, setSelectedUser] = useState<{ name: string; accountNumber: string } | null>(null)
//   const [selected]

  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [currency, setCurrency] = useState<string>('')
  const [forexRate, setForexRate] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const[selectedTransferMethod,setSelectedTransferMethod]=useState("BankTransfer")



let applicant_service=new ApplicantService()
let transaction_service=new TransactionService()


  
useEffect(()=>{
  applicant_service.getApplicantDetalis().then(data=>{
    let users=data.map((e)=>{
  let benificiary_list=e.beneficiaryList.map((b)=>{

    return(



      { "benificaryId": b.beneficiaryId,
        "name": b.beneficiaryName,
        "accountHolderName":b.beneficiaryName,
         "accountNumber": b.bankBicCode, 
         "bank": b.bankName, 
         "ifscCode": b.bankBicCode })
    
    
    })

  return ({
     "applicantId": e.applicant.applicantId,
id:e.applicant.applicantId,
name:e.applicant.applicantName,
accountNumber: '**********789',
profilePhoto: 'https://randomuser.me/api/portraits/women/4.jpg',
benificary:benificiary_list

  })
})


setUserList(users as any)


})
  
// console.log(se)

},[])



  const handleCountryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const countryCode = event.target.value as string
    setSelectedCountry(countryCode)

    // Find the selected country
    const selected = countries.find((country) => country.code === countryCode)
    if (selected) {
      setCurrency(selected.currency)
      setForexRate(selected.forexRate)
    }
  }
  const handleRadioChange = (row: any) => {
    
    setSelectedTime(row)
    setSelectedTimeTableRow(row.id)
    setSelectedTimeCharge(row.charges)
  }
  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const TimechargesRows: GridRowsProp = [
    { id: 1, time: '2 hours', charges: 10,total:200 },
    { id: 2, time: '8 hours', charges: 5 ,total:200},
    { id: 3, time: '2 days', charges: 0.5 ,total:200},
  ]
  const chargesTableColumns: GridColDef[] = [
    {
      field: 'select',
      headerName: 'select',
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <Radio
          checked={selectedTimeTableRow === params.row.id}
          onChange={() => handleRadioChange(params.row)}
          value={params.row.id}
          inputProps={{ 'aria-label': `Select row ${params.row.id}` }}
        />
      ),

      sortable: false,
      filterable: false,
      headerClassName: 'super-app-theme--header',
    },
    { field: 'time', headerName: 'Time', flex: 1, headerClassName: 'super-app-theme--header' },
   
    { field: 'charges', headerName: 'Fees', flex: 1, headerClassName: 'super-app-theme--header',


      renderCell: (params: any) => <span>{params.row.charges + ' ' + sourceCountry}</span>,

     },
    {
      field: 'total',
      headerName: 'Total Amount ',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params: GridRenderCellParams) => {
        // Set charges based on specific conditions
        const timeOfDay = params.row.time
        let chargeValue = 50

        return <span>{`${Number(amount) + params.row.charges + ' ' + sourceCountry}`}</span>
      },
    },
  ]

  const calculateProgress = () => {
    switch (tabValue) {
      case '1':
        return 33
      case '2':
        return 66
      case '3':
        return 100
      default:
        return 0
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchText(value)

    // Filter users based on the search text for name or ID
    if (value.trim() === '') {
      setFilteredUsers([])
    } else {
      const filtered = userlist.filter((user) => user.name.toLowerCase().includes(value.toLowerCase()) || user.id.toString().includes(value))
      setFilteredUsers(filtered)
    }
  }
  const handleUserSelect = (user: { name: string; accountNumber: string }) => {
    console.log(user)
    setSelectedUser(user)
    setSearchText(user.name) // Set selected user's name in TextField
    setFilteredUsers([]) // Clear th
  }

  const selectedPaymentMethod = {
    method: 'Bank Transfer',
    exchangeRate: '1 USD = 74 INR',
    amountReceivable: '₹7,400',
    charges: '₹100',
    totalAmount: '₹7,500',
    time: '1-2 Days',
  }
  const paymentMethods = [
    {
      method: 'Bank Transfer',
      exchangeRate: ' 4.21',
      amountReceivable: '₹7,400',
      charges: '₹100',
      totalAmount: '₹7,500',
      time: '1-2 Days',
    },
    {
      method: 'PayPal',
      exchangeRate: '4.21',
      amountReceivable: '₹7,300',
      charges: '₹150',
      totalAmount: '₹7,450',
      time: 'Instant',
    },
    {
      method: 'Western Union',
      exchangeRate: '4.21',
      amountReceivable: '₹7,200',
      charges: '₹200',
      totalAmount: '₹7,400',
      time: 'Same Day',
    },
  ]

  const [selectedGateway, setSelectedGateway] = React.useState('')

  return (
    <Box
      sx={{
        width: '80vw',
      }}
    >
      <Typography variant="h5" gutterBottom>
        <strong>Send Money </strong>
      </Typography>

      <LinearProgress variant="determinate" value={calculateProgress()} sx={{ marginBottom: 2 }} />

      <TabContext value={tabValue}>
        <Tabs value={tabValue} onChange={handleChange} sx={{ marginBottom: 3 }}>
          <Tab label="Select Gateway" value="1" />
          <Tab label="Select Beneficiary" value="2" />
          <Tab label="Pay Now" value="3" />
        </Tabs>

        <TabPanel value="1">
          <Box>
            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={12} md={6}>

                <TextField
                  //   label="Select User"
                  variant="filled"
                  fullWidth
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Type a  User name or ID..."
                  InputProps={{
                    startAdornment: selectedUser && (
                      <InputAdornment position="start">
                        <Avatar src={selectedUser.profilePhoto} alt={selectedUser.name} style={{ marginRight: '8px' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                {filteredUsers.length > 0 && (
                  <Paper elevation={3} style={{ marginTop: '10px' }}>
                    <List>
                      {filteredUsers.map((user) => (
                        // {user}
                        <ListItem key={user.id} divider button onClick={() => handleUserSelect(user)}>
                          <ListItemAvatar>
                            <Avatar src={user.profilePhoto} alt={user.name}>
                              {user.name[0]}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={user.name} secondary={`ID: ${user.id} | Account: ${user.accountNumber}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                {selectedUser && (
                  <Typography style={{ marginTop: '20px', textAlign: 'center', color: 'grey' }}>
                    <VerifiedIcon
                      sx={{
                        color: 'green',
                      }}
                    />
                    {selectedUser.name} (Account: {selectedUser.accountNumber})

                
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Box>
              <Grid container spacing={2} marginBottom={2}>
                {/* Destination Country Dropdown */}
                <Grid item xs={12} md={3}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel>Destination Country</InputLabel>
                    <Select value={selectedCountry} onChange={handleCountryChange} displayEmpty>
                      {countries.map((country) => (
                        <MenuItem key={country.code} value={country.code}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={country.flag} alt={country.name} sx={{ width: 24, height: 24, marginRight: '8px' }} />
                            <Typography>{country.name}</Typography>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Amount Input */}
                <Grid item xs={12} md={3}>
                  <TextField
                    label={  ` Amount in ${sourceCountry}`}
                    variant="filled"
                    fullWidth
                    onChange={(e) => {
                      setAmount(e.target.value as any)
                    }}
                  />
                </Grid>

                {/* Currency (Auto-populated and Disabled) */}
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Currency"
                    variant="filled"
                    value={currency}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>

                {/* Forex Rate (Auto-populated and Disabled) */}
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Forex Rate"
                    variant="filled"
                    value={forexRate}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} marginBottom={2}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{
                    '& .super-app-theme--header': {
                      backgroundColor: '#005099',
                      color: 'white',
                    },
                  }}
                >
                  {selectedCountry&& amount>0 ? (
                    <>
                      {' '}
                      <DataGrid
                        rows={TimechargesRows}
                        columns={chargesTableColumns}
                        pageSize={5}
                        disableSelectionOnClick
                        hideFooterSelectedRowCount
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{
                    '& .super-app-theme--header': {
                      backgroundColor: '#005099',
                      color: 'white',
                    },
                  }}
                >
                  <Paper sx={{ padding: 3, marginBottom: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Select Payment Gateway
                    </Typography>
                    <Autocomplete
                      value={selectedGateway}
                      onChange={(event, newValue) => setSelectedGateway(newValue)}
                      options={paymentGateways}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <li {...props} key={option.id}>
                          <Grid container alignItems="center">
                            <Avatar src={option.avatarUrl} alt={option.name} sx={{ marginRight: 2 }} />
                            <Typography>{option.name}</Typography>
                          </Grid>
                        </li>
                      )}
                      renderInput={(params) => <TextField {...params} label="Payment Gateway" variant="filled" fullWidth />}
                      isOptionEqualToValue={(option, value) => option.id === value?.id}
                    />
                  </Paper>
                </Grid>

                {selectedGateway ? (
                  <>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{
                        '& .super-app-theme--header': {
                          backgroundColor: '#005099',
                          color: 'white',
                        },
                      }}
                    >
                      <PaymentMethodsTable amount={amount} timecharge={selecteTimeChange} setFinalRate={setFinalAmount} setGatewayCharge={setGatewayCharge}  currency={sourceCountry} setSelectedTransferMethod={setSelectedTransferMethod} />
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </Grid>
            </Box>



            <Box sx={{ textAlign: 'left', marginTop: 2 }}>

            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
     Settlement  Amount: {  amount * Number(forexRate)+" " +currency}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
    Total Amount: {  (Number( amount)+Number(gatewayCharge)+Number(selecteTimeChange))+" " +sourceCountry}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
      Base Amount: {  amount+" " +sourceCountry}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Gateway Fee: {  gatewayCharge +" " +sourceCountry }
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        Time Charges: {  selecteTimeChange +" " +sourceCountry }
      </Typography>
      
      <Button variant="contained" color="primary" onClick={() => {
        
        setTabValue('2')


      


      }}>
              Continue
            </Button>
    </Box>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box>
            <Typography variant="h5" gutterBottom>
             Transaction Details
            </Typography>

            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={12} md={6}>
                {/* <TextField label="Destination Country" variant="filled" fullWidth defaultValue={selectedCountry} disabled /> */}
                <FormControl variant="filled" fullWidth disabled>
                    <InputLabel>Destination Country</InputLabel>
                    <Select value={selectedCountry} onChange={handleCountryChange} displayEmpty>
                      {countries.map((country) => (
                        <MenuItem key={country.code} value={country.code}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={country.flag} alt={country.name} sx={{ width: 24, height: 24, marginRight: '8px' }} />
                            <Typography>{country.name}</Typography>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>


              </Grid>
              <Grid item xs={12} md={6}>
              <TextField
                    label="Amount"
                    variant="filled"
                    fullWidth
                    defaultValue={amount}
                    disabled
                    onChange={(e) => {
                      setAmount(e.target.value as any)
                    }}
                  />
                {/* <TextField label="Amount" variant="filled" fullWidth defaultValue="1000 USD" disabled /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Payment Method" variant="filled" fullWidth defaultValue={selectedTransferMethod} disabled />
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" gutterBottom>
              Customer
            </Typography>
            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={12} md={6}>

              <Grid item xs={12} md={6}>

                <TextField
                disabled
                  //   label="Select User"
                  variant="filled"
                  fullWidth
                  value={searchText}
                  onChange={handleSearchChange}
                  placeholder="Type a  User name or ID..."
                  InputProps={{
                    startAdornment: selectedUser && (
                      <InputAdornment position="start">
                        <Avatar src={selectedUser.profilePhoto} alt={selectedUser.name} style={{ marginRight: '8px' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                {filteredUsers.length > 0 && (
                  <Paper elevation={3} style={{ marginTop: '10px' }}>
                    <List>
                      {filteredUsers.map((user) => (
                        <ListItem key={user.id} divider button onClick={() => handleUserSelect(user)}>
                          <ListItemAvatar>
                            <Avatar src={user.profilePhoto} alt={user.name}>
                              {user.name[0]}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={user.name} secondary={`ID: ${user.id} | Account: ${user.accountNumber}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}
              </Grid>
                {/* <TextField label="Customer ID" variant="filled" fullWidth placeholder="Enter Customer ID" /> */}
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" gutterBottom>
              Beneficiary
            </Typography>
            {/* <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="Account Holder Name" variant="filled" fullWidth placeholder="Enter Account Holder Name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Account Number" variant="filled" fullWidth placeholder="Enter Account Number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Bank" variant="filled" fullWidth placeholder="Enter Bank Name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="IFSC Code" variant="filled" fullWidth placeholder="Enter IFSC Code" />
              </Grid>
            </Grid> */}
            <BeneficiaryForm selectedBenificary={selectedBenficary} setselectedBenficiary={setSelectedBenificary}  beneficiaries={selectedUser?.benificary} ></BeneficiaryForm>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" gutterBottom>
              BOP Category
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField label="BOP Category" variant="filled" fullWidth placeholder="Enter BOP Category" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="BOP Description" variant="filled" fullWidth placeholder="Enter BOP Description" />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <TextField label="Amount" variant="filled" fullWidth placeholder="Enter Amount" />
              </Grid> */}
            </Grid>

            <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={() =>{ 

              setTabValue('3')

              console.log({
               benificary:selectedBenficary,
               transferMethod:selectedTransferMethod,
                destinationCountry:selectedCountry,
                selectedTimeMethod:selectedTime,
                gateway:selectedGateway,
                amount:amount,
               applicant:selectedUser,
               forex:forexRate,
               timecharge:selectedTime?.time,
               sourceCurrency:'Zar',
               sourceCountry:"SA",
               destinationCurrency:curre,


              totalpaybleamount: (Number(amount)+  Number(selecteTimeChange)+ Number(gatewayCharge))
  



              })
              console.log(selectedUser,selectedCountry,amount,selectedGateway,selectedPaymentMethod,selectedTimeTableRow,selectedCountry,selectedTransferMethod,selectedBenficary)
   


            }}>
              Continue
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value="3">
          <Box>
            <Typography variant="h5" gutterBottom>
              Review & Confirm
            </Typography>

            <Grid container spacing={2} marginBottom={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Destination Country:</strong> {selectedCountry}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Amount:</strong> {amount +"  "+ sourceCountry}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1">
                  <strong>Payment Method:</strong> {selectedTransferMethod}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ marginY: 2 }} />

            <Typography variant="h6" gutterBottom>
              Transaction Summary
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Description</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Amount</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                    <TableCell>Settlement Amount</TableCell>
                    <TableCell align="right">{amount*forexRate +" "+currency }</TableCell>
                  </TableRow>


                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell align="right">{amount +" "+sourceCountry}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Time Charges</TableCell>
                    <TableCell align="right">{selecteTimeChange+" "+sourceCountry }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gateway Charges</TableCell>
                    <TableCell align="right">{ gatewayCharge +" " +sourceCountry}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <strong>Net Payable</strong>
                    </TableCell>
                    <TableCell align="right"> 
                      <strong>{sourceCountry+ " "+ (Number(amount)+  Number(selecteTimeChange)+ Number(gatewayCharge)) }</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={() => {

let payload={
  benificary:selectedBenficary,
  transferMethod:selectedTransferMethod,
   destinationCountry:selectedCountry,
   selectedTimeMethod:selectedTime,
   gateway:selectedGateway,
   amount:amount,
  applicant:selectedUser,
  forex:forexRate,
  timecharge:selectedTime?.time,
  sourceCurrency:'Zar',
  sourceCountry:"SA",
  destinationCurrency:currency,
 totalpaybleamount: (Number(amount)+  Number(selecteTimeChange)+ Number(gatewayCharge))

 }

 
 transaction_service.createTransaction(payload).then(data=>{

  console.log(data)
 })


 setGifSuccess(true)


  

            }}>
              Confirm & Pay
            </Button>
          </Box>
        </TabPanel>
      </TabContext>

      <GifModal open={gifsuccess} setOpen={setGifSuccess}></GifModal>
    


    
    </Box>

  )
}

export default SendMoneyPage
