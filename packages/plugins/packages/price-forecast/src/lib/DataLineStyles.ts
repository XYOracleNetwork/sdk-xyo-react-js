import { alphaCss } from '@xylabs/react-theme'

export const DataLineStyles = (color?: string) => ({
  backgroundColor: color ? alphaCss(color, 0.5) : undefined,
  borderColor: color,
})
