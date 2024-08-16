import type { ThemeOptions } from '@mui/material'

import { themeOptions } from './themeOptions.ts'

const partialAppThemeOptions: ThemeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const { clamped } = ownerState

          if (clamped) {
            const maxWidth = Number.parseInt(clamped as string, 10)

            return {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: `clamp(1%, 100%, ${maxWidth}px)`,
            }
          }
        },
      },
    },
  },
  spacing: 8,
}

export const appThemeOptions = { ...themeOptions, ...partialAppThemeOptions }
