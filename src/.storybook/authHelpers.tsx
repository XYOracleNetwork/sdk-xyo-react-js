import { useTheme } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'
import { ArchivistApiProvider, AuthProvider, AuthServiceId, AuthState, IAuthService, DefaultState, useAuthState } from '../contexts'
import { AuthThemeExtender } from '../components'

interface WrappedArgs {
  authState?: Partial<AuthState>
  apiDomain?: string
  isDarkMode?: boolean
}
type WrappedAuthComponent = (props: WrappedArgs) => React.ReactElement

export type { WrappedAuthComponent, WrappedArgs }

const authServiceList: IAuthService[] = [
  {
    id: AuthServiceId.Web3Wallet,
    title: 'Web3 wallet',
  },
  {
    id: AuthServiceId.EmailPassword,
    title: 'Email and Password',
  },
]

const WithArchivistApi: React.FC = ({ children }) => {
  const { state } = useAuthState()
  const theme = useTheme()

  if (state) {
    return (
      <ArchivistApiProvider archive='temp' apiDomain={state.apiDomain} jwtToken={state.jwtToken}>
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
  const mergedAuthState = {...DefaultState, ...authState}

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