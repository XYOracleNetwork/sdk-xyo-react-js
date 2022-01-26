import { ButtonEx } from '@xylabs/sdk-react'
import { memo } from 'react'

interface AuthFooterProps {
  handleLogout: () => void
  isLoggedIn: boolean
}

const AuthFooterComponent: React.FC<AuthFooterProps> = ({ handleLogout, isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <ButtonEx variant="outlined" onClick={handleLogout}>
        Logout
      </ButtonEx>
    )
  } else {
    return <></>
  }
}

const AuthFooter = memo(AuthFooterComponent)

export { AuthFooter }
