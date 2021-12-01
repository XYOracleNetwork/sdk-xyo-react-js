/* eslint-disable @delagen/deprecation/deprecation */
import { Theme } from '@mui/material'

import BoxlikeValue from './Margin'

/** @deprecated Moved to @xylabs/sdk-react */
const calcSpacing = (theme: Theme, values: BoxlikeValue[]) => {
  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    if (value !== undefined) {
      if (typeof value === 'string') {
        return value
      } else if (typeof value === 'number') {
        return theme.spacing(value)
      }
    }
  }
}

export default calcSpacing
