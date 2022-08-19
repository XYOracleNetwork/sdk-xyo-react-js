import { Alert, AlertProps, AlertTitle } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

import { useValidatePayload } from '../../contexts'

export const ValidatePayloadAlert: React.FC<WithChildren<AlertProps>> = ({ children, ...props }) => {
  const { validPayload, enabled, schema } = useValidatePayload()

  if (enabled && validPayload === false) {
    return (
      <Alert severity="error" {...props}>
        <AlertTitle>Invalid Payload!</AlertTitle>Payload schema claimed to be {schema} but failed to validate.
      </Alert>
    )
  }

  return <>{children}</>
}
