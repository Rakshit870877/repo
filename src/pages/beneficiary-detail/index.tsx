import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button, Switch, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TransactionTable from '../transaction-table';


const BeneficiaryDetailPage = () => {
  const navigate = useNavigate();

  const initialData = {
    applicantId: 'APSIN0012',
    beneficiaryName: 'John Doe',
    nationality: 'American',
    residentCountry: 'USA',
    phone: '1234567890',
    email: 'johndoe@email.com',
    idType: 'Passport',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    addressLine3: 'Building 7',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    accountHolder: 'John Doe',
    accountNumber: '1234567890',
    bankName: 'Bank of America',
    bankCode: 'BOA12345',
    transactionId: '',
    senderTransactionId: '',
    value: '',
    transactionDate: '',
  };

  const [formData, setFormData] = useState(initialData);
  const [isEditable, setIsEditable] = useState(false);
  const [tempData, setTempData] = useState(initialData);
  const [isChanged, setIsChanged] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [searchTransactionId, setSearchTransactionId] = useState('');
  const [showTransactionTable, setShowTransactionTable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setIsChanged(true);
  };

  const handleToggleChange = (event) => {
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

  const handleSaveChanges = () => {
    if (isChanged) {
      const confirmSave = window.confirm('Are you sure you want to save the changes?');
      if (confirmSave) {
        setFormData(tempData);
        setIsChanged(false);
        setIsEditable(false);
        console.log(tempData)
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

      setTransactionData(fetchedData); // Set fetched transaction data
      setShowTransactionTable(true); // Show the table once search is done
    } else {
      alert('Please enter all the fields to search');
    }
  };

  const handleBack = () => {
    navigate('/beneficiary-list');
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
              value={tempData.applicantId}
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
              value={tempData.beneficiaryName}
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
              value={tempData.nationality}
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
              name="residentCountry"
              fullWidth
              value={tempData.residentCountry}
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
              value={tempData.phone}
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
              value={tempData.email}
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
              value={tempData.idType}
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
              name="addressLine1"
              value={tempData.addressLine1}
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
              value={tempData.addressLine2}
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
              value={tempData.addressLine3}
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
              value={tempData.city}
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
              value={tempData.state}
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
              name="zipCode"
              value={tempData.zipCode}
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
              value={tempData.country}
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
              label="Account Holder"
              name="accountHolder"
              value={tempData.accountHolder}
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
              value={tempData.accountNumber}
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
              value={tempData.bankName}
              onChange={handleChange}
              InputProps={{
                readOnly: !isEditable,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Bank Code"
              name="bankCode"
              value={tempData.bankCode}
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
        {showTransactionTable && <TransactionTable transactionData={transactionData} />}
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
