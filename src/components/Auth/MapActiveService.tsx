import { useTheme } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { ButtonEx, FlexCol } from '@xylabs/sdk-react'
import React, { memo, useEffect, useState } from 'react'

import { AuthDispatch, AuthServiceId, AuthState } from '../../contexts'
import { LoginForm } from '../LoginForms'
import { AuthServiceComponentMap } from './AuthServiceComponentMap'

interface ActiveAuthServiceProps {
  authState: AuthState
  dispatch: AuthDispatch
  handleBack: () => void
}

const MapActiveAuthServiceComponent: React.FC<ActiveAuthServiceProps> = ({ dispatch, authState, handleBack }) => {
  const theme = useTheme()
  const { activeAuthServiceId, isLoading, loggedInAccount } = authState
  const [MySelectedAuthService, setMySelectedAuthService] = useState<React.FC | React.FC<LoginForm>>()
  const [myActiveAuthServiceId, setMyActiveAuthServiceId] = useState<string>()

  useEffect(() => {
    if (activeAuthServiceId !== myActiveAuthServiceId) {
      const component = AuthServiceComponentMap[activeAuthServiceId]
      assertEx(component, `No Mapping for AuthServiceId ${activeAuthServiceId}`)
      setMySelectedAuthService(() => component)
      setMyActiveAuthServiceId(activeAuthServiceId)
    }
  }, [activeAuthServiceId, myActiveAuthServiceId])

  return (
    <FlexCol maxWidth="xs">
      {MySelectedAuthService ? <MySelectedAuthService loggedInAccount={loggedInAccount} dispatch={dispatch} /> : null}
      {activeAuthServiceId !== AuthServiceId.None ? (
        <ButtonEx marginY={theme.spacing(4)} disabled={isLoading} variant="outlined" onClick={handleBack}>
          Back
        </ButtonEx>
      ) : (
        <></>
      )}
    </FlexCol>
  )
}

const MapActiveAuthService = memo(MapActiveAuthServiceComponent)

export { MapActiveAuthService }
