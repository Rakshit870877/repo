import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const BeneficiaryTable = ({ 
   //@ts-ignore
  beneficiary }) => {
  const navigate = useNavigate();

  const handleBeneficiaryIdClick = (
     //@ts-ignore
    beneficiaryId) => {
    navigate(`/beneficiary-details/${beneficiaryId}`);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'SNo',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'beneficiaryId',
      headerName: 'Beneficiary ID',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (
        
         //@ts-ignore
        params) => (
        <span
          style={{
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => handleBeneficiaryIdClick(params.row.beneficiaryId)}
        >
          {params.row.beneficiaryId}
        </span>
      ),
    },
    {
      field: 'beneficiaryName',
      headerName: 'Beneficiary Name',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    
    {
      field: 'bankName',
      headerName: 'Bank Name',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'bankBicCode',
      headerName: 'BIC Code',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'idType',
      headerName: 'ID Type',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
  ];

  const rows = Array.isArray(beneficiary) ? beneficiary : [];

  return (
    <>
      {rows.length > 0 ? (
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
          rows={beneficiary}
           //@ts-ignore
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      ) : (
        <p>No beneficiaries found</p> // Handle case where no data is available
      )}
    </>
  );
};

export default BeneficiaryTable;
