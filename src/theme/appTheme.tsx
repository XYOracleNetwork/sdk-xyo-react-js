import { ThemeOptions } from '@mui/material'

const appTheme: ThemeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          const { clamped } = ownerState
          const themeSpacing = theme.spacing(clamped as number)
          const themeSpacing2x = theme.spacing((clamped as number) * 2)
          const themeSpacing3x = theme.spacing((clamped as number) * 3)

          if (clamped) {
            return {
              overflow: 'hidden',
              padding: themeSpacing,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: `clamp(1%, 100% - ${themeSpacing2x}, 100vw - ${themeSpacing3x})`,
            }
          }
        },
      },
    },
  },
}

export { appTheme }
