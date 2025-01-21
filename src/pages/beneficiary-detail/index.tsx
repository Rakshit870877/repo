import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography, Button, Switch, FormControlLabel } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import TransactionTable from '../transaction-table';
import { BeneficiaryService } from '@/services/beneficiary.service';

const beneficiary_service = new BeneficiaryService();

const BeneficiaryDetailPage = () => {
  const navigate = useNavigate();
  const {beneficiaryId} = useParams();
 
  
  const [formData, setFormData] = useState<any>([]);
  const [isEditable, setIsEditable] = useState(false);
  const [tempData, setTempData] = useState<any>([]);
  const [isChanged, setIsChanged] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [searchTransactionId, setSearchTransactionId] = useState('');
  const [showTransactionTable, setShowTransactionTable] = useState(false);

  useEffect(()=>{
    const fetchBeneficiaryData = async()=>{
      if(!beneficiaryId){
        console.error("Beneficiary Id is missing");
        return;
      }
      try{
        const data = await beneficiary_service.searchByBeneficiaryId(beneficiaryId);
        setFormData(data);
        setTempData(data);
      }catch(err){
        console.error("Error fetching data");
      }
    } 
    fetchBeneficiaryData();
  }, [beneficiaryId]);


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
     //@ts-ignore
    setTempData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setIsEditable(true);
      setTempData(formData);
    } else {
      setIsEditable(false);
      if (isChanged) {
        const confirmDiscardChanges = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
        if (confirmDiscardChanges) {
          setTempData(formData);
          setIsChanged(false);
          console.log("changes discarded")
        }
      } else {
        setTempData(formData);
        console.log(formData);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (isChanged) {
      const confirmSave = window.confirm('Are you sure you want to save the changes?');
      if (confirmSave) {
        try {
          // Call the API to update the beneficiary details
          const updatedData = { ...tempData }; // Collect the data to be updated
          console.log("updated Data",updatedData);
          const response = await beneficiary_service.updateBeneficiaryForm( updatedData);
          
          // After successful API response
          setFormData(updatedData); // Update the local state with new data
          setIsChanged(false); // Reset the change flag
          setIsEditable(false); // Disable edit mode
          alert('Changes saved successfully!');
        } catch (error) {
          alert('Failed to save changes. Please try again later.');
        }
      }
    } else {
      alert('No changes made to save!');
    }
  };
  
  const handleSearchTransaction = () => {
    if (searchTransactionId) {
      // Example logic to fetch transaction data based on transaction ID
      const fetchedData = [
        {
          id: 1,
          transactionId: 'T001',
          destinationCountry: 'South Africa',
          amountZAR: '5000',
          status: 'Completed',
          gateway: 'PayPal',
          txnReferenceNumber: 'TXN12345',
          beneficiary: 'John Doe',
        },
        {
          id: 2,
          transactionId: 'T002',
          destinationCountry: 'USA',
          amountZAR: '15000',
          status: 'Pending',
          gateway: 'Stripe',
          txnReferenceNumber: 'TXN12346',
          beneficiary: 'Jane Smith',
        },
        {
          id: 3,
          transactionId: 'T003',
          destinationCountry: 'Canada',
          amountZAR: '12000',
          status: 'Completed',
          gateway: 'Visa',
          txnReferenceNumber: 'TXN12347',
          beneficiary: 'Samuel Jackson',
        },
      ];
 //@ts-ignore
      setTransactionData(fetchedData); // Set fetched transaction data
      setShowTransactionTable(true); // Show the table once search is done
    } else {
      alert('Please enter all the fields to search');
    }
  };

  const handleBack = () => {
    navigate('/beneficiary');
  };

  return (
    <Box sx={{ width: "80vw" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        Beneficiary Details
      </Typography>

      {/* Toggle button for editable/non-editable mode */}
      <FormControlLabel
        control={<Switch checked={isEditable} onChange={handleToggleChange} />}
        label="Edit Mode"
      />

      {/* Beneficiary Information Form */}
      <Box sx={{ width: '50vw' }}>
        <Grid container spacing={2} marginBottom={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Applicant ID"
              variant="filled"
              name="applicantId"
              fullWidth
              value={tempData.applicant || ''}
              InputProps={{
                readOnly: !isEditable,
              }}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} marginBottom={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Beneficiary Name"
              variant="filled"
              name="beneficiaryName"
              fullWidth
              value={tempData.beneficiaryName || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            
            <TextField
              label="Nationality"
              variant="filled"
              name="nationality"
              fullWidth
              value={tempData.nationality || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Resident Country"
              variant="filled"
              name="residenceCountry"
              fullWidth
              value={tempData.residenceCountry||''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} marginBottom={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Phone"
              variant="filled"
              name="phone"
              fullWidth
              value={tempData.phone || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              variant="filled"
              name="email"
              fullWidth
              value={tempData.email || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID Type"
              variant="filled"
              name="idType"
              fullWidth
              value={tempData.idType || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Address Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 1 }}><strong>Address</strong></Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="physicalAddressLine1"
              value={tempData?.physicalAddressLine1 || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 2"
              name="addressLine2"
              value={tempData.physicalAddressLine2 || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 3"
              name="addressLine3"
              value={tempData.physicalAddressLine3 || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={tempData.city || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={tempData.state || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="ZipCode"
              name="postCode"
              value={tempData.postCode || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={tempData.country || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Bank Account Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 1 }}><strong>Bank Details</strong></Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Account Holder Name"
              name="beneficiaryName"
              value={tempData.beneficiaryName || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Account Number"
              name="accountNumber"
              value={tempData.accountNumber || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bankName"
              value={tempData.bankName || ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="BIC Code"
              name="bankBicCode"
              value={tempData?.bankBicCode|| ''}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
        </Grid>
        
      </Box>

      {/* Transaction Search Section */}
      <Box mb={3}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}><strong>Transactions</strong></Typography>
        <Grid container spacing={2} marginBottom={1}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Transaction ID"
              name="transactionId"
              variant='standard'
              value={searchTransactionId}
              onChange={(e) => setSearchTransactionId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button variant="contained" fullWidth onClick={handleSearchTransaction}>
              Search
            </Button>
          </Grid>
        </Grid>

        {/* Show the Transaction Table after clicking Search */}
        {showTransactionTable && <TransactionTable
         //@ts-ignore
        transactionData={transactionData} />}
      </Box>

      {/* Save and Back Buttons */}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={2}>
          {isEditable && (
            <Button variant="contained" fullWidth onClick={handleSaveChanges}>
              Save Changes
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="outlined" onClick={handleBack} fullWidth>
            Back to List
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BeneficiaryDetailPage;
