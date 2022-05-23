import { useTheme } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import { FlexGrowCol, WithChildren } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, AuthService, AuthServiceId, AuthState, AuthThemeExtender, defaultState, useAuthState } from '@xyo-network/react-auth'
import { ArchivistApiProvider } from '@xyo-network/react-archivist-api'

interface WrappedArgs {
  authState?: Partial<AuthState>
  apiDomain?: string
  isDarkMode?: boolean
}
type WrappedAuthComponent = (props: WrappedArgs) => React.ReactElement

export type { WrappedAuthComponent, WrappedArgs }

const authServiceList: AuthService[] = [
  {
    id: AuthServiceId.Web3Wallet,
    title: 'Web3 wallet',
  },
  {
    id: AuthServiceId.EmailPassword,
    title: 'Email and Password',
  },
]

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

const authDecorator: DecoratorFn = (Story, { args }) => {
  const {authState} = args
  const mergedAuthState = {...defaultState(), ...authState}

  return (
    <FlexGrowCol marginY={2} justifyContent="flex-start" alignItems="center">
      <BrowserRouter>
        <AuthProvider authState={mergedAuthState}>
          <WithArchivistApi><Story {...args} /></WithArchivistApi>
        </AuthProvider>
      </BrowserRouter>
    </FlexGrowCol>
  )
}

export { authDecorator, authServiceList }