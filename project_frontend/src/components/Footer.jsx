import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <div>
       <Box sx={{ backgroundColor: "#474b52", color: "white", py: 3, textAlign: "center" }}>
        <Typography variant="body2">
          &copy; 2025 KTU Dashboard. All rights reserved.
        </Typography>
      </Box>
    </div>
  )
}

export default Footer
