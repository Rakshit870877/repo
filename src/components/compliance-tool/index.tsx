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

export default function ComplianceTool(
  //@ts-ignore
  { open, setOpen, userList, fetchUserDetails }) {
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showList, setShowList] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);

  const filteredUsers = userList.filter((
    //@ts-ignore
    b) =>
    b.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleUserSelect = async (
      //@ts-ignore
    user) => {
    setSelectedUser(user);
    setSearchText(user.name);
    setShowList(false);
    setUserDetails(null);
    try {
      const response = await fetchUserDetails({ bpId: user.benificaryId, residentStatus: "resident" });
      setUserDetails(response);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleClearSelection = () => {
    setSelectedUser(null);
    setSearchText("");
    setUserDetails(null);
    setShowList(false);
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <SearchIcon />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height:200,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
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
                  <Avatar
                  //@ts-ignore
                  src={selectedUser.profilePhoto} alt={selectedUser.name} />
                </InputAdornment>
              ),
            }}
          />

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

          {selectedUser && (
            <>
              <Typography sx={{ mt: 2, textAlign: "center", color: "grey" }}>


                {
                //@ts-ignore
                selectedUser.name} (Account: {selectedUser.accountNumber})
              </Typography>
              {userDetails && (
                <Paper sx={{ mt: 2, p: 2 }}>
                  <Typography variant="body1">Compliance Status: {userDetails.complianceStatus ? "Allowed" : "Restricted"}</Typography>
                  <Typography variant="body1">Message: {userDetails.message}</Typography>
                  <Typography variant="body1">Max Limit: {userDetails.maxLimit}</Typography>
                  <Typography variant="body1">Utilized Limit: {userDetails.utilizeLimit}</Typography>
                  <Typography variant="body1">Available Limit: {userDetails.availLimit}</Typography>
                </Paper>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
