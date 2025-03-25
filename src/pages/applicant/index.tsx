import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, TextField, Typography, Button, Switch, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle, Tabs, Tab, Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionTable from '../transaction-table';
import DocumentComponent from '../document-tab';
import { ApplicantService } from '@/services/applicant.service';
import BeneficiaryTable from '@/components/beneficiary-table';
import { BeneficiaryService } from '@/services/beneficiary.service';
import chuks from '../../assets/images/chuks.jpg'

const applicant_service = new ApplicantService();
const beneficiary_service = new BeneficiaryService();

const ApplicantPage = () => {
  const navigate = useNavigate();

  // Define separate states for each field
  const [firstName, setFirstName] = useState('');
 const [middleName, setMiddleName] = useState('');
 const [lastName, setLastName] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [nationality, setNationality] = useState('');
  const [residenceCountry, setResidenceCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postalAddressLine1, setPostalAddressLine1] = useState('');
  const [postalAddressLine2, setPostalAddressLine2] = useState('');
  const [postalAddressLine3, setPostalAddressLine3] = useState('');
  const [suburb, setSuburb] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [physicalAddressLine1, setPhysicalAddressLine1] = useState('');
  const [physicalAddressLine2, setPhysicalAddressLine2] = useState('');
  const [physicalAddressLine3, setPhysicalAddressLine3] = useState('');
  const [residenceSuburb, setResidenceSuburb] = useState('');
  const [residenceCity, setResidenceCity] = useState('');
  const [residenceState, setResidenceState] = useState('');
  const [residencePostalCode, setResidencePostalCode] = useState('');

  const [isEditable, setIsEditable] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  const { applicantId } = useParams();

  useEffect(() => {
    const fetchApplicantData = async () => {
      if (!applicantId) {
        console.error("Applicant ID is missing in the URL");
        return;
      }

      try {
        const data = await applicant_service.searchByApplicantId(applicantId);
        //@ts-ignore
        setFirstName(data?.data?.applicant?.firstName || '');
        //@ts-ignore
        setMiddleName(data?.data?.applicant?.middleName || ''); 
        //@ts-ignore
        setLastName(data?.data?.applicant?.lastName || '');
        updateApplicantName();
         //@ts-ignore
        setNationality(data?.data?.applicant?.nationality || '');
         //@ts-ignore
        setResidenceCountry(data?.data?.applicant?.residenceCountry || '');
         //@ts-ignore
        setEmail(data?.data?.applicantContactDetails?.[1]?.contactDetails || '');
         //@ts-ignore
        setPhone(data?.data?.applicantContactDetails?.[0]?.contactDetails || '');
         //@ts-ignore
        setPostalAddressLine1(data?.data?.applicant?.postalAddressLine1 || '');
         //@ts-ignore
        setPostalAddressLine2(data?.data?.applicant?.postalAddressLine2 || '');
         //@ts-ignore
        setPostalAddressLine3(data?.data?.applicant?.postalAddressLine3 || '');
         //@ts-ignore
        setSuburb(data?.data?.applicant?.suburb || '');
         //@ts-ignore
        setResidenceState(data?.data?.applicant?.residenceState || '');
         //@ts-ignore
        setCity(data?.data?.applicant?.city || '');
         //@ts-ignore
        setState(data?.data?.applicant?.state || '');
         //@ts-ignore
        setPostalCode(data?.data?.applicant?.postalCode || '');
         //@ts-ignore
        setCountry(data?.data?.applicant?.country || '');
         //@ts-ignore
        setState(data?.data?.applicant?.applicantState || '');
        //@ts-ignore
        setPhysicalAddressLine1(data?.data?.applicant?.physicalAddressLine1 || '');
        //@ts-ignore
        setPhysicalAddressLine2(data?.data?.applicant?.physicalAddressLine2 || '');
        //@ts-ignore
        setPhysicalAddressLine3(data?.data?.applicant?.physicalAddressLine3 || '');
        //@ts-ignore
        setResidenceSuburb(data?.data?.applicant?.residenceSuburb || '');
        //@ts-ignore
        setResidenceCity(data?.data?.applicant?.residenceCity || '');
        //@ts-ignore
        setResidenceState(data?.data?.applicant?.residenceState || '');
        //@ts-ignore
        setResidencePostalCode(data?.data?.applicant?.residencePostalCode || '');
        //@ts-ignore
        setResidenceCountry(data?.data?.applicant?.residenceCountry || '');
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    fetchApplicantData();  // Fetch data when the component mounts or applicantId changes
  }, [applicantId]);

  const updateApplicantName = () => {
    const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
    setApplicantName(fullName);
  };

  const fetchBeneficiaries = useCallback(async () => {
    if (!applicantId) return;

    try {
      const data = await beneficiary_service.searchByApplicantId(applicantId);
      console.log("data is coming")
      console.log("data is here=>",data)
      const beneficiaryArray = Array.isArray(data) ? data : [data];
      console.log(beneficiaryArray)
      //@ts-ignore
      const formattedData = data?.map((beneficiary: any, index: number) => ({
        id: index + 1,
        beneficiaryId: beneficiary?.beneficiaryId,
        beneficiaryName: beneficiary?.beneficiaryName,
        accountNumber: beneficiary?.accountNumber,
        bankName: beneficiary?.bankName,
        bankBicCode: beneficiary?.bankBicCode,
        idType: beneficiary?.idType,
      }))


      console.log(formattedData)

      
      setBeneficiaries(formattedData || []);
    } catch (error) {
      console.error('Error fetching beneficiaries:', error);
    }
  }, [applicantId]);

  const fetchTransactions = useCallback(async () => {
    if (!applicantId) return;

    try {
      const data = await applicant_service.getTransactionsByApplicantId(applicantId);
      const transactionArray = Array.isArray(data) ? data : [data];
      console.log("__________-hudhush________ ",transactionArray);
      const formattedData = data?.map((transaction: any, index: number) => ({
        id: index + 1,
        transactionNumber: transaction?.transactionOutward?.transactionNumber,
        sendCountry: transaction?.transactionOutward?.sendCountry,
        receiveCountry: transaction?.transactionOutward?.receiveCountry,
        beneficiaryName: transaction?.beneficiary?.beneficiaryName,
        amount: transaction?.transactionOutward?.principalAmount,
        transactionStatus: transaction?.transactionOutward?.transactionStatus,
      }));
      setTransactions(formattedData || []);
      console.log(formattedData)
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [applicantId]);

  const handleFieldChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setIsChanged(true);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setIsEditable(true);
    } else {
      if (isChanged) {
        setOpenConfirmationDialog(true); 
      } else {
        setIsEditable(false);
      }
    }
  };

  const handleSaveChanges = () => {
    if (isChanged) {
      setOpenSaveDialog(true); // Show save confirmation dialog
    } else {
      alert('No changes made to save!');
    }
  };

  const handleSaveConfirm = () => {
    setOpenSaveDialog(false);
    setIsEditable(false);
    console.log("Saved applicant data");
  };

  const handleDiscardChanges = () => {
    setOpenConfirmationDialog(false);
    setIsEditable(false);
    console.log("Changes discarded");
  };

  const handleCancelEdit = () => {
    setOpenConfirmationDialog(false);
  };

  const handleTabChange = async (
    
    //@ts-ignore
    event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
    if (newValue === 1) {
      await fetchBeneficiaries();
    }
    else if(newValue===2){
      await fetchTransactions();
    }
  };

  const handleBack = () => {
    navigate('/applicant');
  };

  return (
    <Box sx={{ width: "50vw" }}>
      <Box  display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', }}>
        Applicant Details
      </Typography>
      <FormControlLabel
        control={<Switch checked={isEditable} onChange={handleToggleChange} />}
        label="Edit Mode"
      />
      </Box>
      <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="body1" mb={1}
          sx={{
            backgroundColor: 'primary.main',
            p: '0.5%',
            color: 'white',
            paddingBlock: 1,
            paddingInline: 1
          }}
        >
          Applicant Id - {applicantId}
        </Typography>
       
      </Box>

      {/* Applicant Information Form */}
      <Box sx={{ width: '50vw' }}>
        <Grid container spacing={2} mb={2} alignItems="flex-start" justifyContent="space-between">
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {/* <Typography mt={2}>Applicant Picture</Typography> */}
            <Box
              width={110}
              height={110}
              border="2px solid #000"
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Avatar style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }} src={chuks}>SK</Avatar>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={2} marginBottom={1}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Applicant Name"
                  variant="filled"
                  value={firstName}
                  onChange={handleFieldChange(setFirstName)}
                  fullWidth
                  InputProps={{ readOnly: !isEditable }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Nationality"
                  variant="filled"
                  value={nationality}
                  onChange={handleFieldChange(setNationality)}
                  fullWidth
                  InputProps={{ readOnly: !isEditable }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Residence Country"
                  variant="filled"
                  value={residenceCountry}
                  onChange={handleFieldChange(setResidenceCountry)}
                  fullWidth
                  InputProps={{ readOnly: !isEditable }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone"
                  variant="filled"
                  value={phone}
                  onChange={handleFieldChange(setPhone)}
                  fullWidth
                  InputProps={{ readOnly: !isEditable }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="filled"
                  value={email}
                  onChange={handleFieldChange(setEmail)}
                  fullWidth
                  InputProps={{ readOnly: !isEditable }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Permanent Address Section */}
      <Box sx={{ width: "80vw" }}>
        <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 1 }}><strong>Postal Address</strong></Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 1"
              value={postalAddressLine1}
              onChange={handleFieldChange(setPostalAddressLine1)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 2"
              value={postalAddressLine2}
              onChange={handleFieldChange(setPostalAddressLine2)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Address Line 3"
              value={postalAddressLine3}
              onChange={handleFieldChange(setPostalAddressLine3)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Suburb"
              value={suburb}
              //@ts-ignore
              onChange={handleFieldChange(suburb)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="City"
              value={city}
              onChange={handleFieldChange(setCity)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="State/Province"
              value={state}
              onChange={handleFieldChange(setState)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Postal Code"
              value={postalCode}
              onChange={handleFieldChange(setPostalCode)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Country"
              value={country}
              onChange={handleFieldChange(setCountry)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: "80vw" }}>
        <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 1 }}><strong>Physical Address</strong></Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 1"
              value={physicalAddressLine1}
              onChange={handleFieldChange(setPhysicalAddressLine1)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 2"
              value={physicalAddressLine2}
              onChange={handleFieldChange(setPhysicalAddressLine2)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Address Line 3"
              value={physicalAddressLine3}
              onChange={handleFieldChange(setPhysicalAddressLine3)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Suburb"
              value={suburb}
              //@ts-ignore
              onChange={handleFieldChange(suburb)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="City"
              value={residenceCity}
              onChange={handleFieldChange(setResidenceCity)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="State/Province"
              value={residenceState}
              onChange={handleFieldChange(setResidenceState)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Postal Code"
              value={residencePostalCode}
              onChange={handleFieldChange(setResidencePostalCode)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Country"
              value={residenceCountry}
              onChange={handleFieldChange(setResidenceCountry)}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>
      </Box>


      {/* Tab Component */}
      <Tabs sx={{ marginBottom: '10px' }} value={selectedTab} onChange={handleTabChange} aria-label="Customer data tabs" >
        <Tab label="Documents" sx={{ marginRight: '2px' }} />
        <Tab label="Beneficiaries" sx={{ marginRight: '2px' }} />
        <Tab label="Transactions" sx={{ marginRight: '2px' }} />
      </Tabs>

      {/* Tab Content */}
      {selectedTab === 0 && <DocumentComponent />}
      {selectedTab === 1 && <BeneficiaryTable beneficiary={beneficiaries} deleteBeneficiary={beneficiaries}/>}
    
      {selectedTab === 2 && <TransactionTable 
        //@ts-ignore
       transaction={transactions}/>}

      {/* Action Buttons */}
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={3}>
            <Button variant="outlined" onClick={handleBack} fullWidth>
              Back to List
            </Button>
          </Grid>
          <Grid item xs={12} sm={3}>
            {isEditable && (
              <Button variant="contained" fullWidth onClick={handleSaveChanges}>
                Save Changes
              </Button>
            )}
          </Grid>
              
     </Grid>

      {/* Confirmation Dialogs */}
      <Dialog open={openConfirmationDialog} onClose={handleCancelEdit}>
        <DialogTitle>Confirm Discard</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to discard your changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscardChanges} color="primary">Yes</Button>
          <Button onClick={handleCancelEdit} color="secondary">No</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSaveDialog} onClose={() => setOpenSaveDialog(false)}>
        <DialogTitle>Confirm Save</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to save the changes?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveConfirm} color="primary">Yes</Button>
          <Button onClick={() => setOpenSaveDialog(false)} color="secondary">No</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApplicantPage;
