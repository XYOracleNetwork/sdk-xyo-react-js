import React from 'react'

import { AuthServiceId } from '../../auth'
import { EmailPassword, LoginForm, NoneSelected, Web3Login } from '../../login-forms'

const AuthServiceComponentMap: { [key in AuthServiceId]: React.FC<LoginForm> } = {
  [AuthServiceId.EmailPassword]: EmailPassword,
  [AuthServiceId.Web3Wallet]: Web3Login,
  [AuthServiceId.None]: NoneSelected,
}

export { AuthServiceComponentMap }
