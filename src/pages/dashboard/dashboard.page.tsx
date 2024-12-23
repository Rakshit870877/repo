import React, { useState, useEffect } from 'react'
import { Box, Stack, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { DriverService } from '@/services/driver.service'
import dayjs from 'dayjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [environment, setEnvironment] = useState('uat')
  const [drivers, setDrivers] = useState([])

  const [driverchart, setDriverChart] = useState([])

  // Fetch data from the API
  useEffect(() => {
    const driverService = new DriverService()

    driverService.logsopenList().then((data) => {
      // Take only the first 5 records
      const limitedData = data.slice(0, 5).map((driver, index) => ({
        ...driver,
        bgColor: `rgba(255, 0, 0, ${1 - index * 0.2})`, // Gradually reduce red intensity
      }))
      setDrivers(
        //@ts-ignore
        limitedData,
      )
    })

    driverService.getDriverList().then((data) => {
      // Take only the first 5 records
      const limitedData = data.map((driver, index) => ({
        ...driver,
        bgColor: `rgba(255, 0, 0, ${1 - index * 0.2})`, // Gradually reduce red intensity
      }))

      //@ts-ignore
      setDriverChart(limitedData)
    })
  }, [environment])

  const formatDate = (date: string | null) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm') : '-------')

  // Toggle handler for environment
  const handleEnvironmentChange = (
    //@ts-ignore
    event: React.MouseEvent<HTMLElement>,
    //@ts-ignore
    newEnvironment: string | null,
  ) => {
    if (newEnvironment !== null) {
      setEnvironment('uat')
    }
  }

  // Example data for bar chart
  const chartData = {
    labels: driverchart.map((driver: any) => driver.name),
    datasets: [
      {
        label: 'Transactions',
        data: driverchart.map((driver: any) => driver.transaction_count),
        //@ts-ignore
        backgroundColor: driverchart.map((driver, index) => `rgba(255, 0, 0, ${1 - index * 0.2})`), // Gradually reduce red intensity for bars
        borderColor: '#ff0000',
        borderWidth: 1,
        // barPercentage: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Driver Transaction Counts - ${environment.toUpperCase()}`,
      },
    },
  }

  return (
    <Box p={3}>
      {/* Toggle Button for Environment */}
      <Box display="flex" justifyContent="center" mb={4}>
        <ToggleButtonGroup value={environment} exclusive onChange={handleEnvironmentChange} aria-label="environment">
          <ToggleButton value="production" aria-label="production">
            Production
          </ToggleButton>
          <ToggleButton value="uat" aria-label="uat">
            UAT
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Bar Graph */}
      <Box mb={4} sx={{ height: '200px', width: '100%' }}>
        <Bar data={chartData} options={chartOptions} />
      </Box>

      {/* Stack of Cards */}
      <Stack spacing={2}>
        {drivers.map(
          (
            driver,
            //@ts-ignore
            index,
          ) => (
            //@ts-ignore
            <Box
              key={
                //@ts-ignore
                driver.uid
              }
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 15px',
                border: `2px solid red`,
                // backgroundColor: driver.bgColor, // Use the dynamic background color
                borderRadius: '10px',
                width: '100%',
              }}
            >
              {/* Left Section: Driver Name */}
              <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold', flex: 1, textAlign: 'center' }}>
                {
                  //@ts-ignore
                  driver.driver_name
                }
              </Typography>

              {/* Middle Section: Transaction Label */}
              {/* <Box sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  Description
                </Typography>
              </Box> */}

              {/* Right Section: Transaction Count */}
              {/* <Box
                sx={{
                  border: `1px solid red`,
                  borderRadius: '5px',
                  padding: '2px 8px',
                  fontWeight: 'bold',
                  color: 'red',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '30px',
                }}
              >
                {
                  //@ts-ignore
                  driver.description
                }
              </Box> */}

              <Typography variant="body2" sx={{ flex: 1, textAlign: 'right', justifyContent: 'center', color: 'gray' }}>
                <b>Raised At :</b>
              </Typography>

              <Typography variant="body2" sx={{ flex: 1, textAlign: 'center', justifyContent: 'center', color: 'gray', marginLeft: '15px' }}>
                {
                  //@ts-ignore
                  formatDate(driver?.raised_at)
                }
              </Typography>

              {/* Description */}
              <Typography variant="body2" sx={{ flex: 1, textAlign: 'right', justifyContent: 'center', color: 'gray' }}>
                <b>Abend Code :</b>
              </Typography>
              <Typography variant="body2" sx={{ flex: 1, textAlign: 'center', color: 'gray', marginLeft: '15px' }}>
                {
                  //@ts-ignore
                  driver.reason_of_abend || 'No reason provided'
                }
              </Typography>

              {/* attending person */}
              <Typography variant="body2" sx={{ flex: 1, textAlign: 'right', justifyContent: 'center', color: 'gray' }}>
                <b>Attendee :</b>
              </Typography>
              <Typography variant="body2" sx={{ flex: 1, textAlign: 'center', color: 'gray', marginLeft: '15px' }}>
                {
                  //@ts-ignore
                  (driver?.attendee?.first_name || 'None') + ' ' + (driver?.attendee?.last_name || '')
                }
              </Typography>
            </Box>
          ),
        )}
      </Stack>
    </Box>
  )
}

export default Dashboard
