import { ThemeOptions } from '@mui/material'

export const components: ThemeOptions['components'] = {
  MuiCard: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      content: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: {
        '&:hover': {
          filter: 'brightness(75%)',
        },
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
  },
  MuiTableCell: {
    styleOverrides: {
      body: {
        fontFamily: 'monospace',
        whiteSpace: 'nowrap',
      },
      head: {
        fontWeight: 700,
        whiteSpace: 'nowrap',
      },
    },
  },
}
