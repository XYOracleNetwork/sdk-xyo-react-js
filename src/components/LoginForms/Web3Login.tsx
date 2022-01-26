import { Typography, useTheme } from '@mui/material'
import { ButtonEx, FlexCol, useAsyncEffect } from '@xylabs/sdk-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import metaMaskSVG from '../../assets/metamask-fox.svg'
import { AuthActionTypes, useAuthApi, useAuthState } from '../../contexts'

const Web3Login: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { state: authState, dispatch: authDispatch } = useAuthState()
  const [missingMetaMask, setMissingMetaMask] = useState(false)
  const [checkedWallet, setCheckedWallet] = useState(false)
  const { MetaMaskService } = useAuthApi()

  const connectWallet = async () => {
    if (!MetaMaskService.currentAccount) {
      try {
        await MetaMaskService.connectWallet()
        setCheckedWallet(true)
      } catch (err) {
        authDispatch({ payload: { authError: err as Error }, type: AuthActionTypes.UpdateAuthError })
      }
    } else {
      setCheckedWallet(true)
    }
  }

  useAsyncEffect(
    async (mounted) => {
      if (checkedWallet) {
        try {
          await MetaMaskService.challengeWallet()
          navigate('/')
        } catch (err) {
          authDispatch({ payload: { authError: err as Error }, type: AuthActionTypes.UpdateAuthError })
          setCheckedWallet(false)
        }
      }
      return () => {
        if (mounted()) {
          setCheckedWallet(false)
        }
      }
    },
    [authDispatch, authState.authError, checkedWallet, MetaMaskService]
  )

  useEffect(() => {
    if (!MetaMaskService.isMetaMaskInstalled()) {
      setMissingMetaMask(true)
    } else {
      if (!MetaMaskService.currentAccount) {
        MetaMaskService.isWalletIsConnected()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (missingMetaMask) {
    return <p>Please install MetaMask and reload the app.</p>
  } else {
    return (
      <>
        <Typography marginY={4} variant="h3">
          Login with Web3 Wallet
        </Typography>
        {MetaMaskService.currentAccount && authState.isLoggedIn ? (
          <>
            <p>Authorized: {MetaMaskService.currentAccount}</p>
            <p>Disconnect your account from your wallet to logout</p>
          </>
        ) : (
          <FlexCol marginBottom={theme.spacing(1)} marginTop={theme.spacing(1)}>
            <ButtonEx size="large" variant="outlined" className="buttons" onClick={connectWallet}>
              <span>
                <img width="40px" style={{ marginRight: '14px', paddingTop: '8px' }} src={metaMaskSVG} />
              </span>
              Login with MetaMask
            </ButtonEx>
          </FlexCol>
        )}
      </>
    )
  }
}

export { Web3Login }
