import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button, Box, Typography, InputAdornment, IconButton, useTheme } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '@/services/auth.service'
import { LocalStorageService } from '@/helpers/local-storage-service'
import { Logo } from '@/assets/images' // Assuming the logo is properly imported

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const auth_service = new AuthService()
  const local_service = new LocalStorageService()
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    if (local_service.get_accesstoken()) {
      navigate('/dashboard')
    }
  }, [navigate, local_service])

  const handleLogin = async () => {
    try {
      auth_service
        .loginAdmin({
          email,
          password,
          notification_token: '',
        })
        .then((data) => {
          local_service.set_accesstoken(data?.access_token)
          local_service.set_user(data?.user)
          local_service.set_role(data?.user?.role)

          if (data?.access_token) {
            navigate('/dashboard')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
      }}
    >
      <Box
        sx={{
          height: '100%',

          backgroundColor: theme.palette.primary.main,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // padding: 2,
        }}
      >
        <Grid
          container
          sx={{
            maxWidth: '700px',
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            // overflow: 'hidden',
          }}
        >
          {/* Logo Section */}
          <Grid
            item
            xs={12}
            sx={{
              // backgroundColor: theme.palette.primary.light,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={Logo} alt="Logo" style={{ width: '80%', height: '80px', marginBottom: '1rem' }} />
            <Typography variant="h6" color="grey" textAlign="center" fontFamily="Inter">
              Please Sign In With Your Credentials
            </Typography>
          </Grid>

          {/* Form Section */}
          <Grid
            item
            xs={12}
            sx={{
              padding: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Typography variant="h6" color={theme.palette.primary.main} textAlign="center" fontFamily="Inter">
                Email
              </Typography>
              <TextField placeholder="Email" variant="standard" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />

              <Typography variant="h6" color={theme.palette.primary.main} textAlign="center" fontFamily="Inter">
                Password
              </Typography>
              <TextField
                placeholder="Password"
                variant="standard"
                fullWidth
                margin="normal"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>{showPassword ? <Visibility /> : <VisibilityOff />}</IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button variant="contained" color="primary" fullWidth sx={{ mt: 3, padding: '10px 0' }} onClick={handleLogin}>
                Sign In
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default LoginPage
