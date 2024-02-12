import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'sans-serif',
    }
  },
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#fafafa' 
    },
    buttonActive: {
      main: '#c9c9c9'
    },
    winColor: {
      main: '#388e3c'
    },
    lossColor: {
      main: '#f44336'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </CssBaseline>
  </ThemeProvider>
)
