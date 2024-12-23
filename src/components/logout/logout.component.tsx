import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

interface MyModalProps {
  style: React.CSSProperties
  setdropOpen: (open: boolean) => void
  navigate: (path: string) => void
  local_service: {
    delete_eaccestoke: () => void
  }
}

const MyModal: React.FC<MyModalProps> = ({ style, setdropOpen, navigate, local_service }) => (
  <Box sx={{ ...style, p: 4, borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <LogoutIcon sx={{ fontSize: 60, color: 'primary.main' }} />
    </Box>
    <Typography id="transition-modal-title" variant="h4" component="h2" sx={{ textAlign: 'center', mb: 2 }}>
      Are you sure?
    </Typography>
    <Typography variant="body1" sx={{ textAlign: 'center', mb: 4 }}>
      Do you really want to logout?
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          local_service.delete_eaccestoke()
          navigate('/login')
        }}
      >
        Yes
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          setdropOpen(false)
          window.location.reload()
          navigate('/')
        }}
      >
        No
      </Button>
    </Box>
  </Box>
)

export default MyModal
