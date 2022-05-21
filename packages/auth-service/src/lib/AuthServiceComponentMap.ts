import { AuthServiceId } from '@xyo-network/react-auth'
import { EmailPassword, LoginForm, NoneSelected, Web3Login } from '@xyo-network/react-login-forms'
import React from 'react'

const AuthServiceComponentMap: { [key in AuthServiceId]: React.FC<LoginForm> } = {
  [AuthServiceId.EmailPassword]: EmailPassword,
  [AuthServiceId.Web3Wallet]: Web3Login,
  [AuthServiceId.None]: NoneSelected,
}

export { AuthServiceComponentMap }
