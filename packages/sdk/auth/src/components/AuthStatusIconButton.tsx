import { Error } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import { IconButton, IconButtonProps, useTheme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { ellipsize, EthAddress } from '@xylabs/sdk-js'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { AuthState, useAuthState } from '../contexts'

const formatAccount = (account: string) => {
  if (account.startsWith('0x')) {
    return EthAddress.fromString(account)?.toShortString()
  } else {
    return ellipsize(account, 4)
  }
}

const formatIconHint = (authState: AuthState | undefined, setIconHint: Dispatch<SetStateAction<string | undefined>>) => {
  if (authState) {
    // logged in and reAuth is false
    if (authState.loggedInAccount && !authState.reAuthenticate) {
      setIconHint(`Signed In as ${authState.loggedInAccount}`)
    }
    // not logged in and reAuth is true
    if (!authState.loggedInAccount && authState.reAuthenticate) {
      setIconHint('Please login again')
    }
    // not logged in and reAuth is false
    if (!authState.loggedInAccount && !authState.reAuthenticate) {
      setIconHint('Signed Out')
    }
  } else {
    // if authState isn't present, assume signed out
    setIconHint('Signed Out')
  }
}

export const AuthStatusIconButton: React.FC<IconButtonProps> = ({ onClick, ...props }) => {
  const { state: authState } = useAuthState()
  console.log(authState)
  const [currentAccount, setCurrentAccount] = useState<string>()
  const [iconHint, setIconHint] = useState<string>()
  const [showReAuthBadge, setReAuthBadge] = useState(authState?.reAuthenticate)
  const navigate = useNavigate()
  const theme = useTheme()
  const [params, setParams] = useSearchParams()

  useEffect(() => {
    formatIconHint(authState, setIconHint)
  }, [authState, authState?.loggedInAccount, authState?.reAuthenticate])

  useEffect(() => {
    if (authState?.loggedInAccount) {
      setCurrentAccount(formatAccount(authState?.loggedInAccount))
    } else {
      setCurrentAccount(undefined)
    }
  }, [authState?.loggedInAccount])

  useEffect(() => {
    setReAuthBadge(authState?.reAuthenticate)
  }, [authState?.reAuthenticate])

  const handleClick = () => {
    if (!authState?.loggedInAccount) {
      params.set('returnUrl', window.location.pathname)
      setParams(params, { replace: true })
      navigate('/login')
    }
  }
  return (
    <IconButton title={iconHint} onClick={onClick ?? handleClick} {...props}>
      {currentAccount ? (
        <Identicon borderRadius="50%" padding={0.8} bgcolor={theme.palette.action.active} size={16} value={currentAccount} />
      ) : (
        <FlexRow>
          <PersonIcon />
          {showReAuthBadge && <Error color="warning" sx={{ position: 'absolute', right: '-13px', top: '-10px' }} />}
        </FlexRow>
      )}
    </IconButton>
  )
}
