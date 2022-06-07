import { useTheme } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import { FlexGrowCol, WithChildren } from '@xylabs/sdk-react'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'
import { AuthProvider, AuthThemeExtender, defaultState, useAuthState } from '@xyo-network/react-auth'
import { WalletServiceProvider } from '@xyo-network/react-wallet-service'
import { BrowserRouter } from 'react-router-dom'

const WithArchivistApi: React.FC<WithChildren> = ({ children }) => {
  const { state } = useAuthState()
  const theme = useTheme()

  if (state) {
    return (
      <ArchivistApiProvider apiDomain={state.apiDomain} jwtToken={state.jwtToken} required>
        <AuthThemeExtender themeOptions={theme}>
          {children}
        </AuthThemeExtender>
      </ArchivistApiProvider>
    )
  } else {
    return <></>
  }
}

export const authDecorator: DecoratorFn = (Story, { args }) => {
  const {authState} = args
  const mergedAuthState = {...defaultState(), ...authState}

  return (
    <FlexGrowCol marginY={2} justifyContent="flex-start" alignItems="center">
      <BrowserRouter>
        <AuthProvider authState={mergedAuthState}>
        <WalletServiceProvider>
          <WithArchivistApi><Story {...args} /></WithArchivistApi>
        </WalletServiceProvider>
        </AuthProvider>
      </BrowserRouter>
    </FlexGrowCol>
  )
}