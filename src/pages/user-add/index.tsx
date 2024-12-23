import React, { useState } from 'react'
import { Container, Box, TextField, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { UserService } from '@/services/user.service'
import { useRecoilState } from 'recoil'
import { alertState, alertTextState, alertTypeState, loaderState } from '@/states/state'

interface UserPayload {
  user_code: string
  first_name: string
  last_name: string
  email: string
  password: string
  phone: string
  notification_token: string
}

const UserAdd: React.FC = () => {
  const navigate = useNavigate()

  const [text, setText] = useRecoilState(alertTextState)
  const [type, setType] = useRecoilState(alertTypeState)
  const [open, setOpen] = useRecoilState(alertState)
  const [commonloader, setcommonloader] = useRecoilState(loaderState)

  const [formData, setFormData] = useState<UserPayload>({
    user_code: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: '',
    notification_token: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let user_service = new UserService()
    try {
      setcommonloader(true)
      // Mock API call

      user_service.addUser(formData).then((data) => {
        if (data.id) {
          setType('success')
          setText('User Added Succesfully')
          setOpen(true)
          setTimeout(() => {
            setOpen(false)
            navigate('/users')
          }, 2000)
        } else {
          setType('error')
          setText('User Add Failed')
          setOpen(false)
          setOpen(true)
          setTimeout(() => {
            setOpen(false)
            navigate('/users')
          }, 2000)
        }

        setcommonloader(false)
      })

      // Redirect or reset form upon successful submission
    } catch (error) {
      console.error('Failed to add user:', error)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', padding: 2 }}>
      <Container maxWidth="sm">
        <Box mb={3} textAlign="center">
          <Typography variant="h5" sx={{ color: '#005099' }}>
            Add New User
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="User Code" name="user_code" value={formData.user_code} onChange={handleChange} fullWidth required />
            <TextField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} fullWidth required />
            <TextField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} fullWidth required />
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth required />
            <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth required />
            <TextField label="Notification Token" name="notification_token" value={formData.notification_token} onChange={handleChange} fullWidth />
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#005099' }}>
                Submit
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/user-list')}>
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Box>
  )
}

export default UserAdd
