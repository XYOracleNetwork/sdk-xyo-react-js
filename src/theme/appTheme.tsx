import { ThemeOptions } from '@mui/material'

const appTheme: ThemeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const { clamped } = ownerState

          if (clamped) {
            return {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }
          }
        },
      },
    },
  },
}

export { appTheme }
