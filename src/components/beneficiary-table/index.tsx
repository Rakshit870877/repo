import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const BeneficiaryTable = () => {
  const navigate = useNavigate();
  
  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBeneficiaryData = async (beneficiaryId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://your-api-url.com/beneficiary/${beneficiaryId}`);
      const data = await response.json();
      setBeneficiaries([data]); // Assuming the API returns a single beneficiary object
      setLoading(false);
    } catch (error) {
      console.error('Error fetching beneficiary data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const beneficiaryId = '12345'; // Example beneficiary ID
    fetchBeneficiaryData(beneficiaryId);
  }, []);

  // Function to view beneficiary details
  const viewBeneficiaryDetails = (beneficiaryId: string) => {
    navigate(`/beneficiary-details`);
  };

  // Columns definition
  const columns = [
    {
      field: 'id',
      headerName: 'SNo',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'beneficiaryName',
      headerName: 'Beneficiary Name',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'accountNumber',
      headerName: 'Account Number',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'bank',
      headerName: 'Bank',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'bankCode',
      headerName: 'Bank Code',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'lastTransaction',
      headerName: 'Last Transaction',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <button onClick={() => viewBeneficiaryDetails(params.row.id)}>
          View
        </button>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
          rows={beneficiaries}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}
    </>
  );
};

export default BeneficiaryTable;
