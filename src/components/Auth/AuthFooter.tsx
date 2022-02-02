import { ButtonEx } from '@xylabs/sdk-react'
import { memo } from 'react'

interface AuthFooterProps {
  handleLogout: () => void
}

const AuthFooterComponent: React.FC<AuthFooterProps> = ({ handleLogout }) => (
  <ButtonEx variant="outlined" onClick={handleLogout}>
    Logout
  </ButtonEx>
)

const AuthFooter = memo(AuthFooterComponent)

export { AuthFooter }
