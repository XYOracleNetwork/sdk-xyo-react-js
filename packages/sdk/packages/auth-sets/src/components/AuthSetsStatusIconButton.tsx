import { IconButtonProps } from '@mui/material'
import { AuthStatusIconButtonInner, formatIconHint } from '@xyo-network/react-auth'

import { useAuthSets } from '../contexts'

export const AuthSetsStatusIconButton: React.FC<IconButtonProps> = (props) => {
  const { activeAuthSet, reAuthIssuer } = useAuthSets()
  const reAuth = !!(activeAuthSet?.issuer && reAuthIssuer && activeAuthSet.issuer === reAuthIssuer)

  return (
    <AuthStatusIconButtonInner
      currentAccount={activeAuthSet?.account}
      iconHint={formatIconHint(activeAuthSet?.account, reAuth)}
      reAuthenticate={reAuth}
      {...props}
    />
  )
}
