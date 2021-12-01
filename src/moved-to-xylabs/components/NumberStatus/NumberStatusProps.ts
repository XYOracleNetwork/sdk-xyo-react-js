/* eslint-disable @delagen/deprecation/deprecation */
import { ButtonExProps } from '../ButtonEx'

/** @deprecated Moved to @xylabs/sdk-react */
interface NumberStatusProps extends ButtonExProps {
  autoWidth?: boolean
  error?: Error
  fontSize?: number
  format?: string
  shorten?: string | boolean
  title?: string
  value?: number | string
  width?: number
  rounded?: boolean
}

export default NumberStatusProps
