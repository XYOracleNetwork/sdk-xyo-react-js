/* eslint-disable @delagen/deprecation/deprecation */
import { FlexBoxProps } from '../FlexBox'

/** @deprecated Moved to @xylabs/sdk-react */
interface CookieConsentProps extends FlexBoxProps {
  acceptOnScroll?: boolean
  acceptOnTimer?: number
  onAccept?: (accepted: boolean) => void
}

export default CookieConsentProps
