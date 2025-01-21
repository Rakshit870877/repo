import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography, Button, Switch, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle, Tabs, Tab } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionTable from '../transaction-table';
import DocumentComponent from '../document-tab';
import { ApplicantService } from '@/services/applicant.service';
import BeneficiaryTable from '@/components/beneficiary-table';

const applicant_service = new ApplicantService();

const ApplicantPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<any>({});
  const [tempData, setTempData] = useState<any>({});
  const [isEditable, setIsEditable] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const {applicantId} = useParams();
  useEffect(() => {
    const fetchApplicantData = async () => {
      if (!applicantId) {
        console.error("Applicant ID is missing in the URL");
        return;
      }

      try {
        const data = await applicant_service.searchByApplicantId(applicantId);  
        setFormData(data);   
        setTempData(data);   // Set data to tempData for editing
      } catch (error) {
        console.error("Error fetching applicant data:", error);
      }
    };

    fetchApplicantData();  // Fetch data when the component mounts or applicantId changes
  }, [applicantId]);  // Dependency on applicantId ensures it re-fetches data when applicantId changes


  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTempData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setIsEditable(true);
      setTempData(formData); // Load the form data when Edit mode is enabled
    } else {
      if (isChanged) {
        setOpenConfirmationDialog(true); // Show confirmation dialog to discard changes
      } else {
        setIsEditable(false);
        setTempData(formData);
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
    setFormData(tempData);
    setIsChanged(false);
    setIsEditable(false);
    setOpenSaveDialog(false);
    console.log("Saved applicant data", tempData);
  };

  const handleDiscardChanges = () => {
    setTempData(formData);
    setIsChanged(false);
    setIsEditable(false);
    setOpenConfirmationDialog(false);
    console.log("Changes discarded");
  };

  const handleCancelEdit = () => {
    setOpenConfirmationDialog(false);
  };

  const handleTabChange = (
     //@ts-ignore
    event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const handleBack = () => {
    navigate('/applicant');
  };

  return (
    <Box sx={{ width: "50vw" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        Applicant Details
      </Typography>

      {/* Toggle button for editable/non-editable mode */}
      <FormControlLabel
        control={<Switch checked={isEditable} onChange={handleToggleChange} />}
        label="Edit Mode"
      />

      {/* Applicant Information Form */}
      <Box sx={{ width: '50vw' }}>
        <Grid container spacing={2} marginBottom={1}>
          <Grid item xs={12} sm={4}>
          <TextField
              label="Applicant Name"
              variant="filled"
              name="firstName"
              fullWidth
              value={tempData?.data?.applicant?.firstName || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nationality"
              variant="filled"
              name="nationality"
              fullWidth
              value={tempData?.data?.applicant?.nationality || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Residence Country"
              variant="filled"
              name="residenceCountry"
              fullWidth
              value={tempData?.data?.applicant?.residenceCountry || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>

        {/* Contact Information */}
        <Grid container spacing={2} marginBottom={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              variant="filled"
              name="applicantContactDetails.contactDetails"
              fullWidth
              value={tempData?.data?.applicantContactDetails?.[0]?.contactDetails || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              variant="filled"
              name="applicantContactDetails.contactDetails"
              fullWidth
              value={tempData?.data?.applicantContactDetails?.[1]?.contactDetails || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>
        </Box>
        <Box sx={{width:"80vw"}}>
        {/* Permanent Address Section */}
        <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 1 }}><strong>Postal Address</strong></Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="postalAddressLine1"
              value={tempData?.data?.applicant?.postalAddressLine1 || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="postalAddressLine2"
              value={tempData?.data?.applicant?.postalAddressLine2 || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 3"
              name="postalAddressLine3"
              value={tempData?.data?.applicant?.postalAddressLine3 || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={tempData?.data?.applicant?.city || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={tempData?.data?.applicant?.state || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={tempData?.data?.applicant?.postalCode || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={tempData?.data?.applicant?.country || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 1 }}><strong>Physical Address</strong></Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="physicalAddressLine1"
              value={tempData?.data?.applicant?.physicalAddressLine1 || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="physicalAddressLine2"
              value={tempData?.data?.applicant?.physicalAddressLine2 || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 3"
              name="physicalAddressLine3"
              value={tempData?.data?.applicant?.physicalAddressLine3 || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="City"
              name="residenceCity"
              value={tempData?.data?.applicant?.residenceCity || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="State"
              name="residenceState"
              value={tempData?.data?.applicant?.residenceState || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
             
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Zip Code"
              name="residencePostalCode"
              value={tempData?.data?.applicant?.residencePostalCode || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Country"
              name="residenceCountry"
              value={tempData?.data?.applicant?.residenceCountry || ''}
              onChange={handleChange}
              InputProps={{ readOnly: !isEditable }}
            />
          </Grid>
        </Grid>
      

      {/* Tab Component */}
      <Tabs sx={{ marginBottom: '10px' }} value={selectedTab} onChange={handleTabChange} aria-label="Customer data tabs" >
        <Tab label="Documents" sx={{ marginRight: '2px' }} />
        <Tab label="Beneficiaries" sx={{ marginRight: '2px' }} />
        <Tab label="Transactions" sx={{ marginRight: '2px' }} />
      </Tabs>

      {/* Tab Content */}
      {selectedTab === 0 && <DocumentComponent />}
      
      {selectedTab === 1 &&
       //@ts-ignore
      <BeneficiaryTable />}
      {selectedTab === 2 && <TransactionTable />}

      {/* Action Buttons */}
      <Box mt={2} display="flex" justifyContent="flex-start">
        <Button variant="outlined" color="primary" onClick={handleBack}>Back to List</Button>
        <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ marginLeft: 2 }}>
          Save Changes
        </Button>
      </Box>

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
    </Box>
  );
};

export default ApplicantPage;
