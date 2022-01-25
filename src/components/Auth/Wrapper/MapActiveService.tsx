import { useTheme } from '@mui/material'
import { ButtonEx, FlexCol } from '@xylabs/sdk-react'
import { memo } from 'react'

import { AuthServiceId, AuthState } from '../../../Contexts'
import { EmailPassword, NoneSelected, Web3Login } from '../LoginForms'

interface ActiveAuthServiceProps {
  authState: AuthState
  isLoading: boolean
  handleBack: () => void
}

const MapActiveAuthService: React.FC<ActiveAuthServiceProps> = ({ authState, handleBack, isLoading }) => {
  const theme = useTheme()
  const { activeAuthServiceId } = authState
  let SelectedAuthService

  switch (activeAuthServiceId) {
    case AuthServiceId.EmailPassword: {
      SelectedAuthService = EmailPassword
      break
    }

    case AuthServiceId.Web3Wallet: {
      SelectedAuthService = Web3Login
      break
    }

    case AuthServiceId.None: {
      SelectedAuthService = NoneSelected
      break
    }

    default: {
      throw new Error(`No Mapping for AuthServiceId ${activeAuthServiceId}`)
    }
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

export default memo(MapActiveAuthService)
