// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
// import Login from './pages/login'

import Login from './pages/newlogin'
import Dashboard from './pages/dashboard'
import DashboardLayout from './components/shared-layout'
import ResetPasswordPage from './pages/resetpassword'
import ProtectedRoute, { ProtectedRouteProps } from './helpers/protected-route'

// import { RecoilRoot } from 'recoil'
import IndexPage from './pages/defaultpage'

// import { LocalStorageService } from './helpers/local-storage-service'
import { role } from './states/state'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { LocalStorageService } from './helpers/local-storage-service'

import CreateDriver from './pages/add-driver'
import DriverList from './pages/list-driver'
import UserList from './pages/user-list'
import UserAdd from './pages/user-add'
import LogsList from './pages/log-list'
import NewLog from './pages/add-log'

import favicon from '../src/assets/images/new-logo.png'
import { Schedule } from '@mui/icons-material'
import Scheduler from './pages/scheduler'
import { getToken, onMessage } from 'firebase/messaging'

import { toast, ToastContainer } from 'react-toastify'
import Message from './components/message/index'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import NewTransactionPage from './pages/transaction/index'
import LoaderBackdrop from './components/loader/loader'
import CustomSnackbar from './components/customsnackbar/snackbar'
import KYCPage from './pages/kyc'
import SendMoneyPage from './pages/send-money'

// const { VITE_APP_VAPID_KEY } = import.meta.env

// const[sta]

function App() {
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    authenticationPath: '/login',
  }
  //@ts-ignore

  const [currentrole, setcurrentrole] = useRecoilState(role)

  // let local_storage_service = new LocalStorageService()
  // let role = local_storage_service.get_role()
  // let mole = 'admin'
  // console.log(role)
  // console.log(role)

  // useEffect

  // async function requestPermission() {
  //   //requesting permission using Notification API
  //   const permission = await Notification.requestPermission()

  //   if (permission === 'granted') {
  //     console.log('permisson granted')
  //     const token = await getToken(messaging, {
  //       vapidKey: 'BDnysNJ5LJGYRzOzC34uilCBPDGsAOaxaAGDc7iIC-5Gfpu5GqjCjOBzQebay2-glPK-ewZjlDtKYUH91hCLfPg',
  //     })
  //     console.log(token)

  //     //We can send token to server
  //     console.log('Token generated : ', token)
  //   } else if (permission === 'denied') {
  //     //notifications are blocked
  //     alert('You denied for the notification')
  //   }
  // }

  // onMessage(messaging, (payload) => {
  //   toast(<Message notification={payload.notification} />)
  // })

  // useEffect(() => {
  //   requestPermission()
  // }, [])

  useEffect(() => {
    let local_storage_service = new LocalStorageService()
    let role = local_storage_service.get_role()
    console.log(role)
    console.log('genrated token')
    // requestPermission()
    // console.log(role)
    if (role) {
      setcurrentrole(role.replace(/"/g, ''))
    }

    // console.log('logged the the apptsx', currentrole)
  }, [])
  useEffect(() => {
    console.log(currentrole)
    console.log(currentrole == '"student"')
  }, [currentrole])
  // const [count, setCount] = useState(0)

  const theme = createTheme({
    palette: {
      primary: {
        main: '#0061B1',
        light: '#CDEDFF',

        // Blue,
      },
      secondary: {
        main: '#323232',
        light: 'white',
      },
    },
    typography: {
      fontFamily: "'Roboto', 'Arial', sans-serif",
      // h1: {
      //   fontSize: '2.5rem',
      // },
    },
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <CustomSnackbar />

        <BrowserRouter>
          <Routes>
            {currentrole == 'admin' ? (
              <Route path="/" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<DashboardLayout />} />}>
                {/* <Route path="transaction" element={<TransactionPage />} /> */}
                <Route path="driver/add" element={<CreateDriver />} />
                <Route path="driver" element={<DriverList />} />
                <Route path="users" element={<UserList />} />
                <Route path="users/add" element={<UserAdd />} />
                {/* <Route path="dashboard" element={<Dashboard />} /> */}
                <Route path="logs" element={<LogsList />} />
                <Route path="logs/add" element={<NewLog />} />
                <Route path="schedule" element={<Scheduler />} />

                <Route path="*" element={<IndexPage />} />
              </Route>
            ) : currentrole == 'user' ? (
              <Route path="/" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<DashboardLayout />} />}>
                {/* <Route path="driver/add" element={<CreateDriver />} /> */}
                <Route path="transaction" element={<NewTransactionPage />} />
                <Route path="sendmoney" element={<SendMoneyPage />} />
                <Route path="kyc" element={<KYCPage />} />
                <Route path="driver" element={<DriverList />} />
                <Route path="users" element={<UserList />} />
                {/* <Route path="users/add" element={<UserAdd />} /> */}
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="logs" element={<LogsList />} />
                <Route path="logs/add" element={<NewLog />} />
                {/* <Route path="schedule" element={<Scheduler />} /> */}

                <Route path="*" element={<IndexPage />} />
              </Route>
            ) : (
              <Route path="/" element={<ProtectedRoute {...defaultProtectedRouteProps} outlet={<DashboardLayout />} />}>
                <Route path="driver/add" element={<CreateDriver />} />
                <Route path="driver" element={<DriverList />} />
                <Route path="users" element={<UserList />} />
                <Route path="users/add" element={<UserAdd />} />
                {/* <Route path="dashboard" element={<Dashboard />} /> */}
                <Route path="logs" element={<LogsList />} />
                <Route path="logs/add" element={<NewLog />} />
                <Route path="schedule" element={<Scheduler />} />

                <Route path="*" element={<IndexPage />} />
              </Route>
            )}

            <Route path="login" element={<Login />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
