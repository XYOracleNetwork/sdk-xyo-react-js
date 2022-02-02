import { DecoratorFn } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'
import { AuthApiLoader, AuthLoader, AuthServiceId, AuthState, IAuthService } from '../../contexts'
import { DefaultState } from '../../contexts/Auth/DefaultState'
import { AuthThemeExtender } from '../Auth'

interface WrappedArgs {
  authState?: Partial<AuthState>
  apiDomain?: string
}
type WrappedAuthComponent = (props: WrappedArgs) => React.ReactElement

export type { WrappedAuthComponent }

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

  return (
    <FlexGrowCol marginY={2} justifyContent="flex-start" alignItems="center">
      <BrowserRouter>
        <AuthLoader authState={mergedAuthState}>
          <AuthApiLoader apiDomain={mergedAuthState.apiDomain}>
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