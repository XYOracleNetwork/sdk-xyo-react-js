import { useTheme } from '@mui/material'
import { ButtonEx, FlexCol } from '@xylabs/sdk-react'
import { memo } from 'react'

import { AuthState } from '../../contexts'

interface ActiveAuthServiceProps {
  authState: AuthState
  isLoading: boolean
  handleBack: () => void
}

const MapActiveAuthServiceComponent: React.FC<ActiveAuthServiceProps> = ({ authState, handleBack, isLoading }) => {
  const theme = useTheme()
  const { activeAuthServiceId, authServiceList } = authState
  const { component: SelectedAuthService } = authServiceList.filter(
    (authService) => authService.id === activeAuthServiceId
  )[0]

  if (SelectedAuthService === undefined) {
    throw new Error(`No Mapping for AuthServiceId ${activeAuthServiceId}`)
  }

  return (
    <FlexCol maxWidth="xs">
      <SelectedAuthService authState={authState} />
      <ButtonEx marginTop={theme.spacing(4)} disabled={isLoading} variant="outlined" onClick={handleBack}>
        Back
      </ButtonEx>
    </FlexCol>
  )
}

const MapActiveAuthService = memo(MapActiveAuthServiceComponent)

export { MapActiveAuthService }
