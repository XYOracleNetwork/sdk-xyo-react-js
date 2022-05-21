import { Alert, AlertTitle } from '@mui/material'

const DeprecateStory: React.FC<{ message?: string}> = ({ message }) => {
  return (
    <Alert severity="error" sx={{ marginBottom: '24px' }}>
      <AlertTitle>Story has been Deprecated</AlertTitle>
      {message}
    </Alert>
  )
}

export { DeprecateStory }