import { AuthErrorDialog } from './AuthErrorDialog'
import { ReAuthDialog } from './ReAuthDialog'

const AuthErrorsWrapper = () => {
  return (
    <>
      <AuthErrorDialog />
      <ReAuthDialog />
    </>
  )
}

export { AuthErrorsWrapper }
