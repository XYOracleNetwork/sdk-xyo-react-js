import { AuthServiceId } from '../../contexts'
import { EmailPassword, NoneSelected, Web3Login } from '../LoginForms'

const AuthServiceComponentMap: { [key in AuthServiceId]: React.FC } = {
  [AuthServiceId.EmailPassword]: EmailPassword,
  [AuthServiceId.Web3Wallet]: Web3Login,
  [AuthServiceId.None]: NoneSelected,
}

export { AuthServiceComponentMap }
