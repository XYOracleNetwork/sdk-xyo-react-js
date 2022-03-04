import { Error } from '@mui/icons-material'
import { ButtonBase, colors } from '@mui/material'
import { ellipsize, EthAddress } from '@xylabs/sdk-js'
import { FlexBoxProps, FlexRow, Identicon } from '@xylabs/sdk-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { AuthState, useAuthState } from '../../contexts'

const formatAccount = (account: string) => {
  if (account.startsWith('0x')) {
    return EthAddress.fromString(account)?.toShortString()
  } else {
    return ellipsize(account, 4)
  }
}

const formatIconHint = (
  authState: AuthState | undefined,
  setIconHint: Dispatch<SetStateAction<string | undefined>>
) => {
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

export const AuthStatusIndicator: React.FC<FlexBoxProps> = ({ onClick, ...props }) => {
  const { state: authState } = useAuthState()
  const [currentAccount, setCurrentAccount] = useState<string>()
  const [iconHint, setIconHint] = useState<string>()
  const [showReAuthBadge, setReAuthBadge] = useState(authState?.reAuthenticate)
  const navigate = useNavigate()

  const iconColor = authState?.loggedInAccount ? colors.lightBlue[50] : colors.grey[500]

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
      navigate('/login')
    }
  }
  return (
    <ButtonBase style={{ borderRadius: '50%' }} title={iconHint}>
      <FlexRow
        bgcolor={currentAccount ? iconColor : undefined}
        height={32}
        width={32}
        borderRadius="50%"
        border={`4px solid ${iconColor}`}
        onClick={onClick ?? handleClick}
        {...props}
      >
        <FlexRow>
          {currentAccount ? (
            <Identicon size={16} value={currentAccount} />
          ) : (
            <>
              <FaUserCircle size={28} color={iconColor} />
              {showReAuthBadge && <Error color="warning" sx={{ position: 'absolute', right: '-13px', top: '-10px' }} />}
            </>
          )}
        </FlexRow>
      </FlexRow>
    </ButtonBase>
  )
}
