import { ThemeOptions } from '@mui/material'

const appTheme: ThemeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          const { clamped, paddingFactor } = ownerState
          const padding = theme.spacing(paddingFactor as number, paddingFactor as number)
          const clampOffset = theme.spacing((paddingFactor as number) * 2)

          if (clamped && theme.breakpoints.down('sm')) {
            return {
              overflow: 'hidden',
              padding,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: `clamp(75%, 100%, 100vw - ${clampOffset})`,
            }
          }
        },
      },
    },
  },
  spacing: (factor = 1) => `${4 * factor}px`,
}

export { appTheme }
