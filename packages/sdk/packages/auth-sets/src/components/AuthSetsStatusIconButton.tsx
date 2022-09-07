import { IconButtonProps } from '@mui/material'
import { AuthStatusIconButtonInner, formatIconHint } from '@xyo-network/react-auth'

import { useAuthSets } from '../contexts'

export const AuthSetsStatusIconButton: React.FC<IconButtonProps> = (props) => {
  const { activeAuthSet } = useAuthSets()

  return (
    <AuthStatusIconButtonInner
      currentAccount={activeAuthSet?.account}
      iconHint={formatIconHint(activeAuthSet?.account, activeAuthSet?.reAuthenticate)}
      reAuthenticate={activeAuthSet?.reAuthenticate}
      {...props}
    />
  )
}
