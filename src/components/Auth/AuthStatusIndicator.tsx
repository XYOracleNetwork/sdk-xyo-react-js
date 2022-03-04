import { Error } from '@mui/icons-material'
import { ButtonBase, colors } from '@mui/material'
import { ellipsize, EthAddress } from '@xylabs/sdk-js'
import { FlexBoxProps, FlexRow, Identicon } from '@xylabs/sdk-react'
import { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { useAuthState } from '../../contexts'

const formatAccount = (account: string) => {
  if (account.startsWith('0x')) {
    return EthAddress.fromString(account)?.toShortString()
  } else {
    return ellipsize(account, 4)
  }
}

export const AuthStatusIndicator: React.FC<FlexBoxProps> = ({ onClick, ...props }) => {
  const { state: authState } = useAuthState()
  const [currentAccount, setCurrentAccount] = useState<string>()
  const [showReAuthBadge, setReAuthBadge] = useState(authState?.reAuthenticate)
  const navigate = useNavigate()

  const iconHint = authState?.loggedInAccount ? `Signed In as ${authState.loggedInAccount}` : 'Signed Out'
  const iconColor = authState?.loggedInAccount ? colors.lightBlue[50] : colors.grey[500]

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
