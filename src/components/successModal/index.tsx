import React, { useState } from 'react'
import { Modal, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const GifModal: React.FC = (
   //@ts-ignore
  { open, setOpen }) => {
  const handleOpen = () => setOpen(true)

  let navigate = useNavigate()
  const handleClose = () => {
    setOpen(false)

    navigate('/transaction')
  }

  return (
    <>
      {/* Button to open the modal */}

      {/* Modal component */}
      <Modal open={open} onClose={handleClose} aria-labelledby="gif-modal-title" aria-describedby="gif-modal-description">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          {/* GIF */}
          <img
            src="https://i.pinimg.com/originals/90/13/f7/9013f7b5eb6db0f41f4fd51d989491e7.gif" // Replace this URL with your GIF
            alt="Loading GIF"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />

          {/* Close button */}
          <Button onClick={handleClose} variant="contained" color="secondary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default GifModal
