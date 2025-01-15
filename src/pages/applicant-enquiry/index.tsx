// ApplicantEnquiry.js
import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import ApplicantTable from '@/components/applicant-table'; // Ensure this component is already set up
import { useNavigate } from 'react-router-dom';
import { ApplicantService } from '@/services/applicant.service'; // Assuming you have this service

const applicant_service = new ApplicantService
const ApplicantEnquiry = () => {
  const navigate = useNavigate();
  const [residenceCountry, setResidenceCountry] = useState('');
  const [applicantId, setApplicantId] = useState('');
  const [errors, setErrors] = useState({
    residenceCountry: '',
    applicantId: '',
  });
  const [showTable, setShowTable] = useState(false);
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  const handleSearch = async () => {
    let hasError = false;
  
    if (!applicantId && !residenceCountry) {
      setErrors(prev => ({
        ...prev,
        applicantId: 'At least one field is required to search.',
        residenceCountry: 'At least one field is required to search.'
      }));
      hasError = true;
    }
  
    if (applicantId && applicantId.length !== 4) {
      setErrors(prev => ({ ...prev, applicantId: 'Applicant ID must be 9 characters.' }));
      hasError = true;
    }
  
    if (residenceCountry && (residenceCountry.length !== 3 || !/^[A-Z]{3}$/.test(residenceCountry))) {
      setErrors(prev => ({ ...prev, residenceCountry: 'Country Code must be 3 alphabetic characters.' }));
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
    setErrors({ residenceCountry: '', applicantId: '' });
  
    try {
      let data;
  
      if (applicantId && residenceCountry) {
        data = await applicant_service.searchByApplicantIdAndCountry(applicantId, residenceCountry);
      } else if (applicantId) {
        data = await applicant_service.searchByApplicantId(applicantId);
      } else if (residenceCountry) {
        data = await applicant_service.searchByCountryCode(residenceCountry);
      }
  
      setFilteredApplicants(data);
      setShowTable(true);
    } catch (error) {
      console.error('Error searching applicants:', error);
    }
  };
  

  const handleAddApplicantDetails = () => {
    navigate("/add-applicant");
  };

  const handleCountryCodeChange = (e) => {
    const value = e.target.value.toUpperCase();
    setResidenceCountry(value);

    if (value.length <= 3) {
      setErrors(prev => ({ ...prev, residenceCountry: '' }));
    }
  };

  const handleApplicantIdChange = (e:any) => {
    const value = e.target.value.toUpperCase();
    setApplicantId(value);

    if (value.length <= 9) {
      setErrors(prev => ({ ...prev, applicantId: '' }));
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        <strong>Applicant Enquiry</strong>
      </Typography>

      <Grid container spacing={3} marginBottom={2} alignItems="center">
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

        <Grid item xs={3}>
          <TextField
            variant="standard"
            fullWidth
            label="Country Code"
            value={residenceCountry}
            onChange={handleCountryCodeChange}
            inputProps={{ maxLength: 3 }}
            helperText={errors.residenceCountry || ' '}
            FormHelperTextProps={{
              sx: {
                color: 'red',
              },
            }}
          />
        </Grid>

        <Grid item xs={3} container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" sx={{ padding: '4px 20px' }} onClick={handleSearch}>
              Search
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" sx={{ marginLeft: '50px', padding: '4px 20px' }} onClick={handleAddApplicantDetails}>
              Add
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {showTable && <ApplicantTable applicants={filteredApplicants} />} {/* Display the ApplicantTable here */}
    </Box>
  );
};

export default ApplicantEnquiry;
