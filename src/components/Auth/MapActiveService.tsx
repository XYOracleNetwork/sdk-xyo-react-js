import { useTheme } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { ButtonEx, FlexCol } from '@xylabs/sdk-react'
import React, { memo, useEffect, useState } from 'react'

import { AuthServiceId, AuthState } from '../../contexts'
import { AuthServiceComponentMap } from './AuthServiceComponentMap'

interface ActiveAuthServiceProps {
  authState: AuthState
  isLoading: boolean
  handleBack: () => void
}

const MapActiveAuthServiceComponent: React.FC<ActiveAuthServiceProps> = ({ authState, handleBack, isLoading }) => {
  const theme = useTheme()
  const { activeAuthServiceId } = authState
  const [MySelectedAuthService, setMySelectedAuthService] = useState<React.FC>()

  useEffect(() => {
    if (activeAuthServiceId) {
      const component = AuthServiceComponentMap[activeAuthServiceId]
      assertEx(component, `No Mapping for AuthServiceId ${activeAuthServiceId}`)
      setMySelectedAuthService(() => component)
    }
  }, [activeAuthServiceId])

  return (
    <FlexCol maxWidth="xs">
      {MySelectedAuthService ? <MySelectedAuthService /> : null}
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
