import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BeneficiaryTable from '../beneficiary-table';

const BeneficiaryEnquiry = () => {
  const navigate = useNavigate();
  const [beneficiaryId, setBeneficiaryId] = useState('');
  const [applicantId, setApplicantId] = useState('');
  const [errors, setErrors] = useState({
    beneficiaryId: '',
    applicantId: '',
  });
  const [showTable, setShowTable] = useState(false);
  const [filteredRows, setFilteredRows] = useState([]);

  const rows = [
    { id: 1, beneficiaryId: 'B001', applicantId: 'C00112345', beneficiaryName: 'John Doe', nationality: 'USA', transactionId: 'T001', amount: '5000 ZAR', status: 'Completed' },
    { id: 2, beneficiaryId: 'B002', applicantId: 'C00112345', beneficiaryName: 'Jane Smith', nationality: 'South Africa', transactionId: 'T002', amount: '15000 ZAR', status: 'Pending' },
    { id: 3, beneficiaryId: 'B003', applicantId: 'C003', beneficiaryName: 'Samuel Jackson', nationality: 'USA', transactionId: 'T003', amount: '12000 ZAR', status: 'Completed' },
    { id: 4, beneficiaryId: 'B004', applicantId: 'C004', beneficiaryName: 'Carlos Rivera', nationality: 'Mexico', transactionId: 'T004', amount: '25000 ZAR', status: 'Failed' },
    { id: 5, beneficiaryId: 'B005', applicantId: 'C005', beneficiaryName: 'Olivia Brown', nationality: 'South Africa', transactionId: 'T005', amount: '3000 ZAR', status: 'Completed' },
  ];

  const handleSearchBeneficiary = () => {
    if (beneficiaryId.length !== 4) {
      setErrors((prev) => ({ ...prev, beneficiaryId: 'Beneficiary ID must be 4 characters.' }));
      return;
    }

    if (applicantId.length !== 9) {
      setErrors((prev) => ({ ...prev, applicantId: 'Applicant ID must be 9 characters.' }));
      return;
    }

    setErrors({ beneficiaryId: '', applicantId: '' });

    // Filter rows based on both beneficiaryId and applicantId
    const filteredData = rows.filter((row) => {
      return (
        row.beneficiaryId.toUpperCase().includes(beneficiaryId.toUpperCase()) &&
        row.applicantId.toUpperCase().includes(applicantId.toUpperCase())
      );
    });

    setFilteredRows(filteredData); // Update filtered rows
    setShowTable(true); // Show the table once data is filtered
  };

  const handleAddBeneficiaryDetails = () => {
    navigate('/add-beneficiary');
  };

  const handleBeneficiaryIdChange = (e) => {
    const value = e.target.value.toUpperCase();
    setBeneficiaryId(value);

    if (value.length === 4) {
      setErrors((prev) => ({ ...prev, beneficiaryId: '' }));
    } else if (value.length > 4) {
      setBeneficiaryId(value.slice(0, 4)); // Limit input to 4 characters
    } else {
      setErrors((prev) => ({ ...prev, beneficiaryId: 'Beneficiary ID must be 4 characters.' }));
    }
  };

  const handleApplicantIdChange = (e) => {
    const value = e.target.value.toUpperCase();
    setApplicantId(value);

    if (value.length === 9) {
      setErrors((prev) => ({ ...prev, applicantId: '' }));
    } else if (value.length > 9) {
      setApplicantId(value.slice(0, 9)); // Limit input to 9 characters
    } else {
      setErrors((prev) => ({ ...prev, applicantId: 'Applicant ID must be 9 characters.' }));
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        <strong>Beneficiary Enquiry</strong>
      </Typography>

      <Grid container spacing={3} marginBottom={2} alignItems="center">
        <Grid item xs={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Beneficiary ID"
            value={beneficiaryId}
            onChange={handleBeneficiaryIdChange}
            inputProps={{ maxLength: 4 }}
            helperText={errors.beneficiaryId || ' '}
            FormHelperTextProps={{
              sx: {
                color: 'red',
              },
            }}
          />
        </Grid>

        <Grid item xs={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Applicant ID"
            value={applicantId}
            onChange={handleApplicantIdChange}
            inputProps={{ maxLength: 9 }}
            helperText={errors.applicantId || ' '}
            FormHelperTextProps={{
              sx: {
                color: 'red',
              },
            }}
          />
        </Grid>

        <Grid item xs={3} container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" sx={{ padding: '4px 20px' }} onClick={handleSearchBeneficiary}>
              Search
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" sx={{ marginLeft: '50px', padding: '4px 20px' }} onClick={handleAddBeneficiaryDetails}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {showTable && (
        <BeneficiaryTable rows={filteredRows} />
      )}
    </Box>
  );
};

export default BeneficiaryEnquiry;
