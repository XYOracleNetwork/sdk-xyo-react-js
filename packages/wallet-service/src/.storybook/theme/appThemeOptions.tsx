import { ThemeOptions } from '@mui/material'
import merge from 'lodash/merge'

import { themeOptions } from './themeOptions'

const partialAppThemeOptions: ThemeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const { clamped } = ownerState

          if (clamped) {
            const maxWidth = parseInt(clamped as string, 10)

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
}

export const appThemeOptions = merge({}, themeOptions, partialAppThemeOptions)
