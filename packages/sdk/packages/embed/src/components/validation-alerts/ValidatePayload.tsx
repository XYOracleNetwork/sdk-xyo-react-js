import { Alert, AlertProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

import { useValidatePayload } from '../../contexts/index.js'

export const ValidatePayloadAlert: React.FC<WithChildren<AlertProps>> = ({ children, ...props }) => {
  const { validPayload, enabled, schema } = useValidatePayload()

  if (enabled && validPayload === false) {
    return (
      <Alert severity="error" title="Invalid Payload!" {...props}>
        Payload schema claimed to be {schema} but failed to validate.
      </Alert>
    )
  }

  return <>{children}</>
}
