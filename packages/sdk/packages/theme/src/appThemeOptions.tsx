import { ThemeOptions } from '@mui/material'
import { merge } from '@xylabs/lodash'

import { themeOptions } from './themeOptions.js'

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

export const appThemeOptions = merge({}, themeOptions, partialAppThemeOptions)
