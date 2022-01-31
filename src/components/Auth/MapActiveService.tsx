import { useTheme } from '@mui/material'
import { assertEx } from '@xylabs/sdk-js'
import { ButtonEx, FlexCol } from '@xylabs/sdk-react'
import { memo } from 'react'

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
  const SelectedAuthService = AuthServiceComponentMap[activeAuthServiceId]

  assertEx(SelectedAuthService, `No Mapping for AuthServiceId ${activeAuthServiceId}`)

  return (
    <FlexCol maxWidth="xs">
      <SelectedAuthService />
      {activeAuthServiceId !== AuthServiceId.None ? (
        <ButtonEx marginTop={theme.spacing(4)} disabled={isLoading} variant="outlined" onClick={handleBack}>
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
