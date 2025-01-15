// ApplicantTable.js
import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
//@ts-ignore
const ApplicantTable = ({ applicants }) => {
  const navigate = useNavigate();

  // call api for get the data
//   useEffect(()=>{
//     try{

//     }catch(error){

//     }
//     const applicantId = applicants.applicationId;
//     const countryCode = applicants.countryCode;

//     const response = await submitBeneficiaryForm(applicantId,applicantId);
//     if (response.success) { 
//   })

  // Function to view applicant details
  //@ts-ignore
  const handleApplicantIdClick = (applicantId) => {
    navigate(`/applicant-details`);
  };

  // Define columns for DataGrid
  const columns = [
    {
      field: 'id',
      headerName: 'S. No',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'applicantId',
      headerName: 'Applicant ID',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params:any) => (
        <span
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => handleApplicantIdClick(params.row.applicant.applicantId)}
        >
          {params.row.applicantId}
        </span>
      ),
    },
    {
      field: 'applicantName',
      headerName: 'Applicant Name',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'nationality',
      headerName: 'Nationality',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'residentCountry',
      headerName: 'Resident Country',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'amlSanction',
      headerName: 'AML Sanction',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'lastTransaction',
      headerName: 'Last Transaction',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
  ];

  return (
    <DataGrid
      sx={{
        width: '70vw',
        '& .MuiDataGrid-columnHeaders': {
          '& .super-app-theme--header': {
            backgroundColor: '#005099',
            color: 'white',
          },
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
        },
        '& .MuiDataGrid-cell': {
          fontSize: '14px',
        },
        '& .MuiDataGrid-row:nth-of-type(even)': {
          backgroundColor: '#f0f8ff',
        },
        '& .MuiDataGrid-row:nth-of-type(odd)': {
          backgroundColor: '#ffffff',
        },
        '& .super-app-theme--header': {
          fontSize: '16px',
        },
      }}
      columns={columns}
      rows={applicants}
      pageSize={5}
      rowsPerPageOptions={[5]}
    />
  );
};

export default ApplicantTable;
