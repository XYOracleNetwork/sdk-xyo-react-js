import { DecoratorFn } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'
import { AuthApiLoader, AuthLoader, AuthServiceId, AuthState, IAuthService } from '../../contexts'
import { AuthThemeExtender } from '../Auth'

interface WrappedArgs {
  authState?: Partial<AuthState>
}
type WrappedAuthComponent = (props: WrappedArgs) => React.ReactElement

export type { WrappedAuthComponent }

const authServiceList: readonly IAuthService[] = [
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
  const apiDomain = args?.authState?.apiDomain || 'http://localhost:8080'
  const {authState} = args

  return (
    <FlexGrowCol marginY={2} justifyContent="flex-start" alignItems="center">
      <BrowserRouter>
        <AuthLoader authState={authState}>
          <AuthApiLoader apiDomain={apiDomain}>
            <AuthThemeExtender>
              <Story />
            </AuthThemeExtender>
          </AuthApiLoader>
        </AuthLoader>
      </BrowserRouter>
    </FlexGrowCol>
  )
}

export { authDecorator, authServiceList }