import { ButtonEx } from '@xylabs/sdk-react'
import { memo } from 'react'

export interface AuthFooterProps {
  handleLogout: () => void
}

const AuthFooterComponent: React.FC<AuthFooterProps> = ({ handleLogout }) => (
  <ButtonEx variant="outlined" onClick={handleLogout}>
    Logout
  </ButtonEx>
)

export const AuthFooter = memo(AuthFooterComponent)
