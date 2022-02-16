import { ThemeOptions } from '@mui/material'

const appTheme: ThemeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          const { clamped } = ownerState

          if (clamped) {
            const factor = parseInt(clamped as string, 10)
            const themeSpacing = theme.spacing(factor)
            const themeSpacing2x = theme.spacing(factor * 2)
            const themeSpacing3x = theme.spacing(factor * 3)
            const isSm = theme.breakpoints.down('sm')

            return {
              [isSm]: {
                width: `clamp(1%, 100% - ${themeSpacing2x}, 100vw - ${themeSpacing3x})`,
              },
              overflow: 'hidden',
              padding: themeSpacing,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: `clamp(1%, 100%, 100vw - ${themeSpacing3x})`,
            }
          }
        },
      },
    },
  },
}

export { appTheme }
