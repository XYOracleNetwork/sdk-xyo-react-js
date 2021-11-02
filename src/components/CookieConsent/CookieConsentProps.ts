import { FlexBoxProps } from '../FlexBox'

interface CookieConsentProps extends FlexBoxProps {
  acceptOnScroll?: boolean
  acceptOnTimer?: number
  onAccept?: (accepted: boolean) => void
}

export default CookieConsentProps
