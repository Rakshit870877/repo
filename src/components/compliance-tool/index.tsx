import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  IconButton,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  InputAdornment,
  Typography,
} from "@mui/material";

//@ts-nocheck
import SearchIcon from "@mui/icons-material/Search";
import { ApplicantService } from "@/services/applicant.service";

export default function ComplianceTool(
  
  //@ts-ignore
  { open, setOpen, userList, fetchUserDetails }) {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showList, setShowList] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);

  // Sample testing data
  const testData = {
    testFlag: true,
    requestSource: "test-environment",
    mockData: {
      complianceLimit: 50000,
      message: "Test Mode Active",
    },
  };

  // Filter user list based on search input
  const filteredUsers = userList.filter((b:any) =>
    b.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle user selection and fetch compliance details
  const handleUserSelect = async (user:any) => {
    setSelectedUser(user);
    setSearchText(user.name);
    setShowList(false);
    setUserDetails(null);

    try {
      let applicant_service = new ApplicantService();

      console.log("Selected User:", user);

      // Fetch compliance data with testing data appended
      let comp_data = await applicant_service.getCompliance({
        applicantId: user.applicantId,
        ...testData, // Appending test data
      });

      console.log("Compliance Data:", comp_data); // Log the compliance data

      // Fetch user details with testing data appended
      const response = await fetchUserDetails({
        bpId: user.benificaryId,
        residentStatus: "resident",
        ...testData, // Appending test data
      });

      // Merge compliance data into userDetails state
      setUserDetails({
        ...response,
        complianceLimit: comp_data?.limit || testData.mockData.complianceLimit, // Extract compliance limit or use test data
        message: comp_data?.message || testData.mockData.message,
      });

    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Clear user selection
  const handleClearSelection = () => {
    setSelectedUser(null);
    setSearchText("");
    setUserDetails(null);
    setShowList(false);
  };

  return (
    <>
      {/* Search Icon Button */}
      <IconButton onClick={() => setOpen(true)}>
        <SearchIcon />
      </IconButton>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 200,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Search Input */}
          <TextField
            variant="filled"
            fullWidth
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setShowList(true);
            }}
            placeholder="Type a User name or ID..."
            InputProps={{
              startAdornment: selectedUser && (
                <InputAdornment position="start">
                  <Avatar src={selectedUser.profilePhoto} alt={selectedUser.name} />
                </InputAdornment>
              ),
            }}
          />

          {/* User List */}
          {showList && filteredUsers.length > 0 && (
            <Paper elevation={3} sx={{ mt: 2 }}>
              <List>
                {filteredUsers.map((b:any) => (
                  <ListItem
                    key={b.benificaryId}
                    divider
                    button
                    onClick={() => handleUserSelect(b)}
                  >
                    <ListItemAvatar>
                      <Avatar src={b.profilePhoto} alt={b.name} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={b.name}
                      secondary={`ID: ${b.benificaryId} | Account: ${b.accountNumber}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}

          {/* Selected User & Compliance Info */}
          {selectedUser && (
            <>
              <Typography sx={{ mt: 2, textAlign: "center", color: "grey" }}>
                {selectedUser.name} (Account: {selectedUser.accountNumber})
              </Typography>
              {userDetails && (
                <Paper sx={{ mt: 2, p: 2 }}>
                  <Typography variant="body1">Compliance Status: {userDetails.complianceStatus ? "Allowed" : "Restricted"}</Typography>
                  <Typography variant="body1">Message: {userDetails.message}</Typography>
                  <Typography variant="body1">Max Limit: {userDetails.maxLimit}</Typography>
                  <Typography variant="body1">Utilized Limit: {userDetails.utilizeLimit}</Typography>
                  <Typography variant="body1">Available Limit: {userDetails.availLimit}</Typography>
                  <Typography variant="body1">Amount Allowed: {userDetails.complianceLimit}</Typography> {/* Compliance Limit */}
                </Paper>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
