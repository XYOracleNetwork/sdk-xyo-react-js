import { useTheme } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { ButtonEx, FlexGrowCol } from '@xylabs/sdk-react'
import { AuthDispatch, AuthServiceId, AuthState, useAuthService } from '@xyo-network/react-auth'
import { LoginForm } from '@xyo-network/react-login-forms'
import { WalletServiceProvider } from '@xyo-network/react-wallet-service'
import React, { useEffect, useState } from 'react'

import { AuthServiceComponentMap } from '../lib'

export interface ActiveAuthServiceProps {
  authState: AuthState
  dispatch: AuthDispatch
}

export const MapActiveAuthService: React.FC<ActiveAuthServiceProps> = ({ dispatch, authState }) => {
  const theme = useTheme()
  const { isLoading, loggedInAccount } = authState
  const { activeAuthServiceId, setActiveAuthServiceId } = useAuthService()
  const [ActiveAuthService, setActiveAuthService] = useState<React.FC | React.FC<LoginForm>>()

  useEffect(() => {
    if (activeAuthServiceId) {
      const component = AuthServiceComponentMap[activeAuthServiceId]
      assertEx(component, `No Mapping for AuthServiceId ${activeAuthServiceId}`)
      setActiveAuthService(() => component)
    }
  }, [activeAuthServiceId])

  const onSuccess = () => {
    if (activeAuthServiceId !== AuthServiceId.None) {
      setActiveAuthServiceId?.(AuthServiceId.None)
    }
  }

  return (
    <FlexGrowCol maxWidth={theme.breakpoints.values.sm}>
      {ActiveAuthService ? (
        <WalletServiceProvider>
          <ActiveAuthService loggedInAccount={loggedInAccount} dispatch={dispatch} onSuccess={onSuccess} />
        </WalletServiceProvider>
      ) : null}
      {activeAuthServiceId !== AuthServiceId.None ? (
        <ButtonEx marginY={theme.spacing(4)} disabled={isLoading} variant="outlined" onClick={() => setActiveAuthServiceId?.(AuthServiceId.None)}>
          Back
        </ButtonEx>
      ) : (
        <></>
      )}
    </FlexGrowCol>
  )
}
