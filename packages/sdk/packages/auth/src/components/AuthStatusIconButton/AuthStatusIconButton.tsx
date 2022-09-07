import { IconButtonProps } from '@mui/material'

import { useAuthState } from '../../contexts'
import { AuthStatusIconButtonInner } from './AuthStatusIconButtonInner'
import { formatIconHint } from './lib'

export const AuthStatusIconButton: React.FC<IconButtonProps> = ({ ...props }) => {
  const { state: authState } = useAuthState()

  return (
    <AuthStatusIconButtonInner
      currentAccount={authState?.loggedInAccount}
      iconHint={formatIconHint(authState?.loggedInAccount, authState?.reAuthenticate)}
      reAuthenticate={authState?.reAuthenticate}
      {...props}
    />
  )
}
