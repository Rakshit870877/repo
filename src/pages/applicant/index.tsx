import { Box, Grid, TextField, Typography, Avatar, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
// import { theme } from '@/contants/theme;

const ApplicantPage = () => {

    const theme=useTheme(   )
  return (
    <Box sx={{

        width:"70vw"
    }}>
        <Typography variant="h6" gutterBottom>
                 <strong> Applicant Details</strong>
        </Typography>
         <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <Typography
                variant="h6"
                sx={{
                          backgroundColor: theme.palette.primary.main,
                          p: '0.5%',
                          color: 'white',
                          paddingBlock:1,
                          paddingInline:2,
                          marginBottom:2
                 }}> KYC ID - KYCIN0012
             </Typography>
             
        </Box>
        
      <Grid container alignItems="flex-start" spacing={2} mb={4}>
        <Grid item xs={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography mt={2} >
                 Applicant Picture
            </Typography>
            <Box width={90} height={90} border="2px solid #000" borderRadius="50%" display="flex" alignItems="center" justifyContent="center">
                 <Typography></Typography>
             </Box>           
         </Grid>
        <Grid item xs>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="Customer Name"
                variant="filled"
                defaultValue="Chakshu Chopra"
                size='small'
              />
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Nationality"
                    variant="filled"
                    defaultValue="Indian"
                    size='small'
                    
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Residence Country"
                    variant="filled"
                    defaultValue="South Africa"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
                           Current Address
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

              

      {/* Optional Buttons */}
      <Box mt={4} display="flex" justifyContent="flex-end">
        <button  color="primary" style={{ marginRight: 8 }}>
          Save
        </button>
        <button color="success">
          Save and Verify
        </button>
      </Box>
    </Box>
  )
}

export default ApplicantPage
