import { Box, Button, useTheme } from '@mui/material'
import React from 'react'
import FlexBetween from '../../components/FlexBetween'
import Header from '../../components/Header'

const ProcessLoans = () => {
    const theme = useTheme()
  return (
    <Box mt="2rem">
      <FlexBetween>
        <Header title="PROCESS LOANS" subtitle="Coming soon...." />

        <Box>
          <Button 
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              mb: "25px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#3c52b2",
              },
            }}
          >
            ADD LOAN
          </Button>
        </Box>
      </FlexBetween>
      </Box>
  )
}

export default ProcessLoans