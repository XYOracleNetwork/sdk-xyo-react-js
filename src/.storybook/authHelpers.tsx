import { useTheme } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'
import { AuthApiLoader, AuthLoader, AuthServiceId, AuthState, IAuthService, DefaultState } from '../contexts'
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

const authDecorator: DecoratorFn = (Story, { args }) => {
  const {authState} = args
  const mergedAuthState = {...DefaultState, ...authState}
  const theme = useTheme()

  return (
    <FlexGrowCol marginY={2} justifyContent="flex-start" alignItems="center">
      <BrowserRouter>
        <AuthLoader authState={mergedAuthState}>
          <AuthApiLoader apiDomain={mergedAuthState.apiDomain}>
            <AuthThemeExtender themeOptions={theme}>
              <Story {...args} />
            </AuthThemeExtender>
          </AuthApiLoader>
        </AuthLoader>
      </BrowserRouter>
    </FlexGrowCol>
  )
}

export { authDecorator, authServiceList }