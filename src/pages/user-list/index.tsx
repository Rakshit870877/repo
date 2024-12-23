import React, { useEffect, useState } from 'react'
import { DataGrid, gridClasses, GridColDef } from '@mui/x-data-grid'
import { Container, Box, Button, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UserService } from '@/services/user.service'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRecoilState } from 'recoil'
import { alertState, alertTextState, alertTypeState, loaderState } from '@/states/state'

export interface User {
  id: string
  user_code: string
  first_name: string
  last_name: string
  email: string
  phone: string
  created_at: string
  role: string
  notification_token: string
}

const UserList: React.FC = () => {
  const user_service = new UserService()
  const [users, setUsers] = useState<User[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [editableUser, setEditableUser] = useState<Partial<User>>({})
  const [text, setText] = useRecoilState(alertTextState)
  const [type, setType] = useRecoilState(alertTypeState)
  const [open, setOpen] = useRecoilState(alertState)
  const [commonloader, setcommonloader] = useRecoilState(loaderState)
  const navigate = useNavigate()

  useEffect(() => {
    user_service.getUserList().then((data) => {
      if (data) {
        const filteredUsers = data.filter((user: User) => user.role !== 'admin')
        setUsers(filteredUsers)
      }
    })
  }, [])

  const handleEditClick = (user: User) => {
    setEditableUser(user)
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
    setEditableUser({})
  }

  const handleInputChange = (field: keyof User, value: string) => {
    setEditableUser((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveClick = () => {
    if (editableUser.id) {
      user_service
        .editUser(
          editableUser.id,

          //@ts-ignore
          editableUser,
        )
        .then((data) => {
          if (data.id) {
            setType('success')
            setText('User Edited Successfully')
            setOpen(true)
            setTimeout(() => setOpen(false), 2000)

            setUsers((prev) => prev.map((user) => (user.id === editableUser.id ? { ...user, ...data } : user)))
            handleDialogClose()
          } else {
            setType('error')
            setText('User Edit Failed')
            setOpen(true)
            setTimeout(() => setOpen(false), 2000)
          }
          setcommonloader(false)
        })
    }
  }

  const handleDeleteClick = (id: string) => {
    user_service
      .deleteUser(id)
      .then(() => {
        setUsers((prev) => prev.filter((user) => user.id !== id))

        setType('success')
        setText('User Deleted Successfully')
        setOpen(true)
        setTimeout(() => setOpen(false), 2000)
      })
      .catch(() => {
        setType('error')
        setText('User Deletion Failed')
        setOpen(true)
        setTimeout(() => setOpen(false), 2000)
      })
  }

  const columns: GridColDef[] = [
    { field: 'user_code', headerName: 'User Code', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'first_name', headerName: 'First Name', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'last_name', headerName: 'Last Name', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'email', headerName: 'Email', flex: 1, headerClassName: 'super-app-theme--header' },
    { field: 'phone', headerName: 'Phone', flex: 1, headerClassName: 'super-app-theme--header' },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton color="primary" onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDeleteClick(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ]

  return (
    <Box sx={{ padding: 2 }}>
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" color="primary">
            Users
          </Typography>
          <Button variant="contained" onClick={() => navigate('add')}>
            Add User
          </Button>
        </Box>
        <Box
          sx={{
            borderRadius: 2,
            boxShadow: 3,
            width: '100%',
            '& .super-app-theme--header': {
              backgroundColor: '#005099',
              color: 'white',
            },
          }}
        >
          <DataGrid
            rows={users}
            columns={columns}
            //@ts-ignore
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id}
            autoHeight
            sx={{
              [`& .${gridClasses.menuIcon}`]: {
                visibility: 'visible',
                width: 'auto',
              },
            }}
          />
        </Box>

        {/* Edit User Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="First Name"
              value={editableUser.first_name || ''}
              onChange={(e) => handleInputChange('first_name', e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Last Name"
              value={editableUser.last_name || ''}
              onChange={(e) => handleInputChange('last_name', e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Email"
              value={editableUser.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Phone"
              value={editableUser.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              margin="dense"
            />
            <TextField
              fullWidth
              label="Notification Token"
              value={editableUser.notification_token || ''}
              onChange={(e) => handleInputChange('notification_token', e.target.value)}
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSaveClick} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  )
}

export default UserList
