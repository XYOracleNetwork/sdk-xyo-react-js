import Error from '@mui/icons-material/Error'
import PersonIcon from '@mui/icons-material/Person'
import { IconButton, IconButtonProps, useTheme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { ellipsize, EthAddress } from '@xylabs/sdk-js'
import { useNavigate } from 'react-router-dom'

const formatAccount = (account: string) => {
  if (account.startsWith('0x')) {
    return EthAddress.fromString(account)?.toShortString()
  } else {
    return ellipsize(account, 4)
  }
}

interface AuthStatusIconButtonInnerProps extends IconButtonProps {
  currentAccount?: string | null
  iconHint?: string
  reAuthenticate?: boolean
}

export const AuthStatusIconButtonInner: React.FC<AuthStatusIconButtonInnerProps> = ({
  currentAccount,
  iconHint,
  reAuthenticate,
  onClick,
  ...props
}) => {
  const theme = useTheme()
  const navigate = useNavigate()

  const handleClick = () => {
    if (currentAccount) {
      localStorage.setItem('returnUrl', window.location.pathname)
      navigate('/login')
    }
  }
  return (
    <IconButton title={iconHint} onClick={onClick ?? handleClick} {...props}>
      {currentAccount ? (
        <Identicon borderRadius="50%" padding={0.8} bgcolor={theme.palette.action.active} size={16} value={formatAccount(currentAccount)} />
      ) : (
        <FlexRow>
          <PersonIcon />
          {reAuthenticate && <Error color="warning" sx={{ position: 'absolute', right: '-13px', top: '-10px' }} />}
        </FlexRow>
      )}
    </IconButton>
  )
}
