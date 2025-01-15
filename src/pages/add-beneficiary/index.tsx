import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BeneficiaryFormData, BeneficiaryFormErrors } from '@/types/beneficiary.type';
import { BeneficiaryService } from '@/services/beneficiary.service';


const beneficiary_service = new BeneficiaryService();
const AddBeneficiary = () => {
  const navigate = useNavigate();
  const theme = useTheme();
    const [text, setText] = useState('');
    const [type, setType] = useState('');
    const [open, setOpen] = useState(false);

  // Initial state for form data and errors
  const [formData, setFormData] = useState<BeneficiaryFormData>({
    applicantId: '',
    beneficiaryName: '',
    nationality: '',
    residentCountry: '',
    phone: '',
    email: '',
    idType: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    accountHolder: '',
    accountNumber: '',
    bankName: '',
    bankCode: '',
  
  });

  const [formErrors, setFormErrors] = useState<BeneficiaryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    //@ts-ignore
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form validation
  const validateForm = () => {
    const errors: BeneficiaryFormErrors = {};
    if (!formData.applicantId) errors.applicantId = 'Applicant ID is required';
    if (!formData.beneficiaryName) errors.beneficiaryName = 'Beneficiary Name is required';
    if (!formData.nationality) errors.nationality = 'Nationality  is required';
    if (!formData.country) errors.residentCountry = 'Country is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.idType) errors.idType = 'ID Type is required';
    if (!formData.addressLine1) errors.addressLine1 = 'Address Line 1 is required';
    if (!formData.city) errors.city = 'City is required';
    if (!formData.state) errors.state = 'State is required';
    if (!formData.zipCode) errors.zipCode = 'ZipCode is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.accountHolder) errors.accountHolder = 'Account Holder is required';
    if (!formData.accountNumber) errors.accountNumber = 'Account Number is required';
    if (!formData.bankName) errors.bankName = 'Bank Name is required';
    if (!formData.bankCode) errors.bankCode = 'Bank Code is required';
    
    return errors;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    // Navigate to another page after successful submission

    try {
        //@ts-ignore
      const response = await beneficiary_service.submitBeneficiaryForm(formData);
      debugger;
      if (response.success) {
        setText('Beneficiary Successfully Added');
        setType('success');
        setOpen(true);
        navigate('/beneficiary');
      } else {
        setText('Unable to Submit Beneficiary');
        setType('error');
        setOpen(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setText('Error while submitting form');
      setType('error');
      setOpen(true);
    }
  };

  return (
    <Box sx={{ width: "80vw" }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        Add Beneficiary 
      </Typography>

      {/* Applicant ID Section */}
      <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="body1"
          sx={{
            backgroundColor: theme.palette.primary.main,
            p: '0.5%',
            color: 'white',
            paddingBlock: 1,
            paddingInline: 2,
          }}
        >
          Beneficiary ID - ________
        </Typography>
      </Box>

      {/* Applicant Information Fields */}
      <Box sx={{ width: '50vw' }}>
        <Grid container spacing={2} marginBottom={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Applicant ID"
              variant="filled"
              name="applicantId"
              fullWidth
              value={formData.applicantId}
              onChange={handleChange}
              error={!!formErrors.applicantId}
              helperText={formErrors.applicantId}
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
              value={formData.beneficiaryName}
              onChange={handleChange}
              error={!!formErrors.beneficiaryName}
              helperText={formErrors.beneficiaryName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nationality"
              variant="filled"
              name="nationality"
              fullWidth
              value={formData.nationality}
              onChange={handleChange}
              error={!!formErrors.nationality}
              helperText={formErrors.nationality}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Resident Country"
              variant="filled"
              name="residentCountry"
              fullWidth
              value={formData.residentCountry}
              onChange={handleChange}
              error={!!formErrors.residentCountry}
              helperText={formErrors.residentCountry}
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
              value={formData.phone}
              onChange={handleChange}
              error={!!formErrors.phone}
              helperText={formErrors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              variant="filled"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID Type"
              variant="filled"
              name="idType"
              fullWidth
              value={formData.idType}
              onChange={handleChange}
              error={!!formErrors.idType}
              helperText={formErrors.idType}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: '20%', background: 'linear-gradient(to right, #3b82f6 40%, #60a5fa 50%, #ffffff 100%)', height: '3px', marginY: 2 }} />
      {/* Address Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 1 }}><strong>Address</strong></Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              error={!!formErrors.addressLine1}
              helperText={formErrors.addressLine1}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 2 (Optional)"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address Line 3 (Optional)"
              name="addressLine3"
              value={formData.addressLine3}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={!!formErrors.city}
              helperText={formErrors.city}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={!!formErrors.state}
              helperText={formErrors.state}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              error={!!formErrors.zipCode}
              helperText={formErrors.zipCode}
            />
          </Grid>
          <Grid item xs={12} sm={1.5}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={!!formErrors.country}
              helperText={formErrors.country}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ width: '20%', background: 'linear-gradient(to right, #3b82f6 40%, #60a5fa 50%, #ffffff 100%)', height: '3px', marginY: 2 }} />
      {/* Bank Information Section */}
      <Box mb={3}>
        <Typography variant="subtitle1" sx={{ color: 'grey', marginBottom: 1 }}><strong>Bank Information</strong></Typography>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Account Holder"
              name="accountHolder"
              value={formData.accountHolder}
              onChange={handleChange}
              error={!!formErrors.accountHolder}
              helperText={formErrors.accountHolder}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Account Number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              error={!!formErrors.accountNumber}
              helperText={formErrors.accountNumber}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              error={!!formErrors.bankName}
              helperText={formErrors.bankName}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Bank Code"
              name="bankCode"
              value={formData.bankCode}
              onChange={handleChange}
              error={!!formErrors.bankCode}
              helperText={formErrors.bankCode}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Transaction Section */}
      {/* <Box mb={3}>
        <Typography variant="h6" sx={{  marginBottom: 1 }}><strong>Transactions</strong></Typography>
        <Grid container spacing={2} marginBottom={1}>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Transaction ID"
              name="transactionId"
              variant='standard'
              value={formData.transactionId}
              onChange={handleChange}
              error={!!formErrors.transactionId}
              helperText={formErrors.transactionId}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Sender Transaction Id"
              name="senderTransactionId"
              variant='standard'
              value={formData.senderTransactionId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Value"
              name="value"
              variant='standard'
              value={formData.value}
              onChange={handleChange}
              error={!!formErrors.value}
              helperText={formErrors.value}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Transaction Date"
              name="transactionDate"
              variant='standard'
              value={formData.transactionDate}
              onChange={handleChange}
              error={!!formErrors.transactionDate}
              helperText={formErrors.transactionDate}
            />
          </Grid>
        </Grid>
      </Box> */}

      {/* Buttons */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <Button variant="contained" fullWidth onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button variant="outlined" onClick={() => navigate('/beneficiary-list')} fullWidth>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddBeneficiary;
