import { Box, Button } from '@mui/material'
import React from 'react'
import FlexBetween from '../../../components/FlexBetween'
import Header from '../../../components/Header'
import { useTheme } from '@emotion/react'

const LoanAssets = () => {
    const theme = useTheme()
  return (
    <Box mt="2rem">
      <FlexBetween>
        <Header title="LOAN ASSETS" subtitle="Coming soon...." />

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
            Add Loan Asset
          </Button>
        </Box>
      </FlexBetween>
      </Box>
  )
}

export default LoanAssets