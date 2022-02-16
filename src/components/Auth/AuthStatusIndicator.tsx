import { Box, colors, IconButton, Link, Typography } from '@mui/material'
import { ellipsize, EthAddress } from '@xylabs/sdk-js'
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

const AuthStatusIndicator = () => {
  const [currentAccount, setCurrentAccount] = useState<string>()
  const { state: authState } = useAuthState()
  const navigate = useNavigate()
  const iconHint = authState?.isLoggedIn ? `Signed In as ${authState.loggedInAccount}` : 'Signed Out'
  const iconColor = authState?.isLoggedIn ? colors.lightBlue[50] : colors.grey[500]

  useEffect(() => {
    if (authState.isLoggedIn && authState.loggedInAccount) {
      setCurrentAccount(formatAccount(authState.loggedInAccount))
    } else {
      setCurrentAccount(undefined)
    }
  }, [authState.isLoggedIn, authState.loggedInAccount])

  const handleClick = () => {
    if (!authState.isLoggedIn) {
      navigate('/login')
    }
  }

  return (
    <Box alignItems="center" display="flex" justifyContent="center">
      {currentAccount && <Typography variant="caption">{currentAccount}</Typography>}
      <Link onClick={handleClick}>
        <IconButton title={iconHint}>
          <FaUserCircle color={iconColor} />
        </IconButton>
      </Link>
    </Box>
  )
}

export { AuthStatusIndicator }
