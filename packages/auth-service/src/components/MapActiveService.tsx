import { useTheme } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { ButtonEx, FlexGrowCol } from '@xylabs/sdk-react'
import { AuthDispatch, AuthServiceId, AuthState } from '@xyo-network/react-auth'
import { LoginForm } from '@xyo-network/react-login-forms'
import { WalletServiceProvider } from '@xyo-network/react-wallet-service'
import React, { Dispatch, memo, SetStateAction, useEffect, useState } from 'react'

import { AuthServiceComponentMap } from '../lib'

export interface ActiveAuthServiceProps {
  authState: AuthState
  dispatch: AuthDispatch
  handleBack: () => void
  activeAuthServiceId: AuthServiceId
  setActiveAuthServiceId: Dispatch<SetStateAction<AuthServiceId>>
}

export const MapActiveAuthServiceComponent: React.FC<ActiveAuthServiceProps> = ({ dispatch, authState, handleBack, setActiveAuthServiceId, activeAuthServiceId }) => {
  const theme = useTheme()
  const { isLoading, loggedInAccount } = authState
  const [ActiveAuthService, setActiveAuthService] = useState<React.FC | React.FC<LoginForm>>()

  useEffect(() => {
    if (activeAuthServiceId) {
      const component = AuthServiceComponentMap[activeAuthServiceId]
      assertEx(component, `No Mapping for AuthServiceId ${activeAuthServiceId}`)
      setActiveAuthService(() => component)
    }
  }, [activeAuthServiceId])

  return (
    <FlexGrowCol maxWidth={theme.breakpoints.values.sm}>
      {ActiveAuthService ? (
        <WalletServiceProvider>
          <ActiveAuthService loggedInAccount={loggedInAccount} dispatch={dispatch} setActiveAuthServiceId={setActiveAuthServiceId} activeAuthServiceId={activeAuthServiceId} />
        </WalletServiceProvider>
      ) : null}
      {activeAuthServiceId !== AuthServiceId.None ? (
        <ButtonEx marginY={theme.spacing(4)} disabled={isLoading} variant="outlined" onClick={handleBack}>
          Back
        </ButtonEx>
      ) : (
        <></>
      )}
    </FlexGrowCol>
  )
}

export const MapActiveAuthService = memo(MapActiveAuthServiceComponent)
