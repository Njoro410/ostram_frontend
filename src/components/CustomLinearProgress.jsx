import { LinearProgress, useTheme } from '@mui/material'
import React from 'react'

const CustomLinearProgress = () => {
    const theme = useTheme()
  return (
    <LinearProgress
    sx={{
      backgroundColor: theme.palette.secondary[500],
      margin: 1,
    }}
  />
  )
}

export default CustomLinearProgress