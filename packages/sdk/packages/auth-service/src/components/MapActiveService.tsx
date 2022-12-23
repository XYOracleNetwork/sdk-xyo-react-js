import { assertEx } from '@xylabs/assert'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { AuthDispatch, AuthServiceId, AuthState, useAuthService } from '@xyo-network/react-auth'
import { LoginForm } from '@xyo-network/react-login-forms'
import { WalletServiceProvider } from '@xyo-network/react-wallet-service'
import React, { useEffect, useState } from 'react'

import { AuthServiceComponentMap } from '../lib'

export interface ActiveAuthServiceProps extends FlexBoxProps {
  authState: AuthState
  dispatch: AuthDispatch
}

export const MapActiveAuthService: React.FC<ActiveAuthServiceProps> = ({ dispatch, authState, ...props }) => {
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
    <FlexCol {...props}>
      {ActiveAuthService ? (
        <WalletServiceProvider>
          <ActiveAuthService loggedInAccount={loggedInAccount} dispatch={dispatch} onSuccess={onSuccess} />
        </WalletServiceProvider>
      ) : null}
      {activeAuthServiceId !== AuthServiceId.None ? (
        <ButtonEx disabled={isLoading} variant="outlined" onClick={() => setActiveAuthServiceId?.(AuthServiceId.None)}>
          Back
        </ButtonEx>
      ) : (
        <></>
      )}
    </FlexCol>
  )
}
