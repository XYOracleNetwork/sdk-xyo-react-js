import { useTheme } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { ButtonEx, FlexGrowCol } from '@xylabs/sdk-react'
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
  const { activeAuthServiceId, isLoading, loggedInAccount, authServiceList } = authState
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
    <FlexGrowCol maxWidth={theme.breakpoints.values.sm}>
      {MySelectedAuthService ? (
        <MySelectedAuthService
          loggedInAccount={loggedInAccount}
          dispatch={dispatch}
          authServiceList={authServiceList}
        />
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

const MapActiveAuthService = memo(MapActiveAuthServiceComponent)

export { MapActiveAuthService }
