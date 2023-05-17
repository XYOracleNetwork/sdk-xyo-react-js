import { Alert, AlertProps, AlertTitle } from '@mui/material'

export interface PayloadDataMissingProps extends AlertProps {
  alertBody?: string
}

export const PayloadDataMissing: React.FC<PayloadDataMissingProps> = ({ alertBody, ...props }) => {
  return (
    <Alert severity="warning" {...props}>
      <AlertTitle>Missing Data</AlertTitle>
      {alertBody ?? 'Payload is missing required data to render correctly'}
    </Alert>
  )
}
