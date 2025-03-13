import React, { useEffect, useState } from 'react'
import { Box, Button, Divider, Grid, Typography, Chip, TextField, Drawer, ToggleButton, ToggleButtonGroup, useTheme, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@mui/material'
import { DataGrid, GridColDef, GridFilterAltIcon } from '@mui/x-data-grid'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate } from 'react-router-dom'
import { TransactionService } from '@/services/transaction.service'
import {
  Applicant,
  TansactionOutwardCalculated,
  TransactionDetailsResponse,
  TransactionInward,
  TransactionInwardCalclulated,
  TransactionOutward,
} from '@/types/transaction.type'
import { Filter1Outlined, SettingsAccessibilityRounded, Sync } from '@mui/icons-material'
import { useRecoilState } from 'recoil'
import { loaderState, loaderStateNew } from '@/states/state'
import { ApplicantService } from '@/services/applicant.service'
import CompliancTool  from '@/components/compliance-tool'

const sampleInwardsData: Array<TransactionInwardCalclulated> = [
  {
     //@ts-ignore
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


const TransactionPage = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Transaction ID', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'destination', headerName: 'Destination', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'value', headerName: 'Value', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'currency', headerName: 'Currency', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'settlement', headerName: 'Settlement', flex: 1, headerClassName: 'super-app-theme--header' },


    {
      field: "stpError",
      headerName: "STP Error",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.value ? (
          <Tooltip title={params.value.errorCause || "Unknown Error"} arrow>
            <Chip label="Error" color="error" />
          </Tooltip>
        ) : (
          <Chip label="No Error" color="success" />
        ),
    },

    {
      field: "reporting",
      headerName: "Reporting Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.value ? (
          <Tooltip title={params.value.reporting || "Unknown Error"} arrow>
            <Chip label="Error" color="error" />
          </Tooltip>
        ) : (
          <Chip label="No Error" color="success" />
        ),
    },
    {
      field: "status",
      headerName: "Trx Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.value ? (
          <Tooltip title={params.value.errorCause || "Unknown Error"} arrow>
            <Chip label="Error" color="error" />
          </Tooltip>
        ) : (
          <Chip label="No Error" color="success" />
        ),
    },

   




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
       
  <IconButton onClick={()=>{

      handleViewMore(params.row)
     }}>
     <VisibilityIcon />
     </IconButton>
     
      ),
    },


  
  ]

  const columns_inwards: GridColDef[] = [
    { field: 'id', headerName: 'Transaction ID', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'sendingCountry', headerName: 'Destination', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'receivingCountry', headerName: 'Source', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'currency', headerName: 'Currency', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'final_amount', headerName: 'Settlement', flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: "stpError",
      headerName: "STP Error",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.value ? (
          <Tooltip title={params.value.errorCause || "Unknown Error"} arrow>
            <Chip label="Error" color="error" />
          </Tooltip>
        ) : (
          <Chip label="No Error" color="success" />
        ),
    },
    { field: 'destinationBank', headerName: 'Destination Bank', flex: 1, headerClassName: 'super-app-theme--header' },
  
    // status:e?.transactionOutward?.transactionStatus=="CR"?"Pending":"Done",


    {
      field: "reporting",
      headerName: "Reporting Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params?.value?.reporting=="Reported" ? (
          <Tooltip title={params?.value?.reporting || "Unknown Error"} arrow>
            <Chip label="Reported" color="success" />
          </Tooltip>
        ) : (
          <Chip label="Pending" color="error" />
        ),
    },


  
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params?.value?.status=='Pending' ? (
          <Tooltip title={params.value.status || "Unknown Error"} arrow>
            <Chip label="Pending" color="error" />
          </Tooltip>
        ) : (
          <Chip label="Done" color="success" />
        ),
    },

 
  
  ]

  // reporting:e?.transactionOutward?.reportingStatus=="ACK"?"Reported":"Pending",
  //           status:e?.transactionOutward?.transactionStatus=="CR"?"Pending":"Done",

  const columns_outward: GridColDef[] = [
    { field: 'id', headerName: 'Transaction ID', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'destination', headerName: 'Destination', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'value', headerName: 'Value', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'currency', headerName: 'Currency', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'final_amount', headerName: 'Settlement', flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: "stpError",
      headerName: "STP Error",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.value ? (
          <Tooltip title={params.value.errorCause || "Unknown Error"} arrow>
            <Chip label="Error" color="error" />
          </Tooltip>
        ) : (
          <Chip label="No Error" color="success" />
        ),
    },
    { field: 'destinationBank', headerName: 'Destination Bank', flex: 1, headerClassName: 'super-app-theme--header' },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        // <Button variant="contained" color="primary" onClick={() => handleViewMore(params.row)}>
        //   View More
        // </Button>
        // <Button variant="contained" color="primary" startIcon={<VisibilityIcon />} onClick={() => handleViewMore(params.row)}>
         
         
        //   View More
        // </Button>

        <IconButton onClick={()=>{

          handleViewMore(params.row)
         }}>
         <VisibilityIcon />
         </IconButton>

      ),
    },

   
    {
      field: "reporting",
      headerName: "Reporting Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params?.value?.reporting=="Reported" ? (
          <Tooltip title={params?.value?.reporting || "Unknown Error"} arrow>
            <Chip label="Reported" color="success" />
          </Tooltip>
        ) : (
          <Chip label="Pending" color="error" />
        ),
    },


  
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) =>
        params.value.status=='Pending' ? (
          <Tooltip title={params.value.status || "Unknown Error"} arrow>
            <Chip label="Pending" color="error" />
          </Tooltip>
        ) : (
          <Chip label="Done" color="success" />
        ),
    },




  
  ]


  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const [transactionDetails, setTransactionDetails] = useState<any>(null)
  const [transactionType, setTransactionType] = useState('inwards') // Default to 'inwards'

  const [inboundTransaction, setInboundTransaction] = useState<Array<TransactionInward>>([])
  const [outboundTransaction, setOutboundTransaction] = useState<Array<TransactionOutward>>([])
  const [ toolopen,setToolOpen]=useState(false)


  //@ts-ignore
  const[applicant,setApplicant]=useState<Applicant> (null)
  
  const [transactionData, setTransactionData] = useState(inboundTransaction)
    const [commonloader, setcommonloader] = useRecoilState(loaderStateNew)

    const[userList,setUserList]=useState([])

    let applicant_service=new ApplicantService()



   
  useEffect(()=>{
    setcommonloader(true)
    applicant_service.getApplicantDetalis().then(data=>{
  
  
      console.log(data)
      
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
  //@ts-ignore
  name:e.applicant?.firstName,
  accountNumber: '**********789',
  profilePhoto: 'https://randomuser.me/api/portraits/women/4.jpg',
  benificary:benificiary_list
  
    })
  })
  
  
  setUserList(users as any)
  setcommonloader(false)
  
  })
    
  // console.log(se)
  
  },[])  

  const handleViewMore = (row:any) => {
    setTransactionDetails(row)
    setDrawerOpen(true)
  }

  let transaction_Service = new TransactionService()


  const trnx=[]
  useEffect(() => {

    setcommonloader(true)
    
    transaction_Service
      .gettransactions()
      .then((data: TransactionDetailsResponse) => {
        console.log("data-----------------------",data);
        
        let inbound: Array<TransactionInwardCalclulated>[]|any = data?.transactionDetailsList.map((e:any) => {
       //@ts-ignore
          return ({
            //@ts-ignore
            ...e.transactionInwardList,
            ...e.beneficiary,
            id: e?.transactionInwardList?.transactionNumberIw,
            destination: e?.transactionInwardList?.receivingCountry,
            value: e?.transactionInwardList?.settlementAmount,
            currency: e?.transactionInwardList?.settlementCurrency,
            settlement: e?.transactionInwardList?.settlementAmount,
            destinationBank: e?.transactionInwardList?.destinationBankCode,
            errorCause:" ",
            forex:e?.transactionOutward?.exchangeRates,
            date:e?.transactionOutward?.owCreatedDate,
            final_amount:e?.transactionOutward?.exchangeRates*e?.transactionOutward?.principalAmount,
            applicant:e?.applicant
          })
        })


        let outbound: Array<TansactionOutwardCalculated>[] |any= data?.transactionDetailsList.map((e) => {
          return {
            ...e.transactionOutward,
            ...e.beneficiary,
            id: e?.transactionOutward.transactionNumber,
            destination: e?.transactionOutward?.receiveCountry,
            value: e?.transactionOutward?.settlementAmount,
            currency: e?.transactionOutward?.settlementCurrency,
            settlement: e?.transactionOutward?.settlementAmount,
            destinationBank: e?.transactionOutward?.destinationBankBicCode,
            forex:e?.transactionOutward?.exchangeRates,
            date:e?.transactionOutward?.owCreatedDate,
            
         

            reporting:e?.transactionOutward?.reportingStatus=="ACK"?"Reported":"Pending",
            status:e?.transactionOutward?.transactionStatus=="CR"?"Pending":"Done",
            final_amount:e?.transactionOutward?.exchangeRates*e?.transactionOutward.principalAmount,
            applicant:e?.applicant
          }
        })
        

        let user:Array<Applicant>[]|any=data?.transactionDetailsList.map((e) => {
          return {
           ...e.applicant
            
          }
        })
       
        setInboundTransaction(inbound)

        setInboundTransaction([])
        setTransactionData(inbound)
        setOutboundTransaction(outbound)
        setcommonloader(false)
   
        
      })
      .catch(
         //@ts-ignore
        (err:any) => {

          console.log("err",err)
        })
  }, [])

  const handleToggleTransactionType = (
    
     //@ts-ignore
    event, newType) => {
    if (newType) {
      setTransactionType(newType)
       //@ts-ignore
      setTransactionData(newType === 'inwards' ? inboundTransaction : outboundTransaction)
    }
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
  }
  const theme = useTheme()
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // Open the dialog
  const handleOpen = () => {
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handle applying filters
  const handleApply = () => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    setOpen(false);
  };

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
          height:'80vh',

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




{/* <IconButton onClick={() => setToolOpen(true)}>
        <SettingsAccessibilityRounded />
      </IconButton> */}

 <IconButton onClick={()=>{

navigate('/recon')

 }} color="primary">
        <Sync sx={{
          marginBottom:"10%"
        }}/>
      </IconButton>

            <Button
              variant="outlined"
              sx={{
                marginBottom: '10%',
              }}
              onClick={
                 //@ts-ignore
                (e) => {
                // console.log()
                navigate('/sendmoney')
              }}
            >
              + Transaction
            </Button>
          </div>
        </div>





{


transactionType=='inwards'?(  <DataGrid
  rows={inboundTransaction}
  columns={columns_inwards}
  getRowId={(row) => row.id} 
   //@ts-ignore
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
/>):( <DataGrid
          rows={outboundTransaction}
          columns={columns_outward}
          getRowId={(row) => row.id} 
           //@ts-ignore
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
        />)
}
       
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
                width: '40%',
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
                <TextField label="Destination" variant="filled" fullWidth
                 //@ts-ignore
                defaultValue={transactionDetails.destination} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Value" variant="filled" fullWidth 
                 //@ts-ignore
                defaultValue={transactionDetails.value} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Currency" variant="filled" fullWidth 
                 //@ts-ignore
                defaultValue={transactionDetails.currency} size="small" disabled />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField label="Date" variant="filled" fullWidth 
                 //@ts-ignore
                defaultValue={transactionDetails.date} size="small" disabled />
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


      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Select Date Range</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            {/* Start Date */}
            <TextField
              label="Start Date"
              type="date"
              value={startDate || ''}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* End Date */}
            <TextField
              label="End Date"
              type="date"
              value={endDate || ''}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleApply} variant="contained" color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
   


< CompliancTool
//@ts-ignore
open={toolopen}
//@ts-ignore
 setOpen={setToolOpen} 
 //@ts-ignore
 userList={userList}
 fetchUserDetails={()=>{


 }}
 
 ></CompliancTool>
    </Box>
  )
}

export default TransactionPage
