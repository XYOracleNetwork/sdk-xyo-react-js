import { FlexGrowCol } from '@xylabs/sdk-react'
import { BrowserRouter } from 'react-router-dom'
import { AuthApiLoader, AuthLoader, IAuthService, AuthServiceId } from '../../contexts'

interface WrappedArgs {
  authServiceList: IAuthService[]
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

const authDecorator = (Story, { args }) => {
  const apiDomain = 'http://localhost:8080'
  const {authServiceList} = args

  return (
    <FlexGrowCol marginY={2} justifyContent="flex-start" alignItems="center">
      <BrowserRouter>
        <AuthLoader authServiceList={authServiceList}>
          <AuthApiLoader apiDomain={apiDomain}>
            <Story />
          </AuthApiLoader>
        </AuthLoader>
      </BrowserRouter>
    </FlexGrowCol>
  )
}

export { authDecorator, authServiceList }