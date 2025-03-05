import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, Input } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const BobCategoryDropdown = ({amount}) => {
  const [category, setCategory] = useState<string>('');
 
  const [contract, setContract] = useState<File | null>(null);
  const [addressProof, setAddressProof] = useState<File | null>(null);

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setContract(file);
  };

  const handleAddressProofChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setAddressProof(file);
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., sending the files to an API
    console.log("Category:", category);
    console.log("Amount:", amount);
    console.log("Contract File:", contract);
    console.log("Address Proof File:", addressProof);
  };

  const showAddressProof = category === '417' || amount > 50000;

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="bob-category-label">Select Bop Category</InputLabel>
        <Select
          labelId="bob-category-label"
          value={category}
          onChange={handleCategoryChange}
          label="Select Bob Category"
        >
          <MenuItem value="401">Gift</MenuItem>
          <MenuItem value="417">Foreign Nationals</MenuItem>
        </Select>
      </FormControl>

      <div>
        
      </div>

      {/* Contract Upload */}
      {category === '417' && (
        <div>
          <Button
            variant="contained"
            component="label"
            color="primary"
            fullWidth
            startIcon={<FileUploadIcon />}
            sx={{
                marginTop:"10px",
                marginBottom:"10px"
            }}
          >
            Upload Salary Contract
           <input
    type="file"
    hidden
  />
          
          </Button>
        </div>
      )}

      {/* Address Proof Upload */}
      {showAddressProof && (
        <div>
          <Button
            variant="contained"
            component="label"
            color="primary"
            fullWidth
            startIcon={<FileUploadIcon />}
          >
            Upload Address Proof
          

<input
    type="file"
    hidden
  />
            
          </Button>
        </div>
      )}

      
    </div>
  );
};

export default BobCategoryDropdown;
