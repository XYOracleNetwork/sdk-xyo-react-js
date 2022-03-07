import { Typography } from '@mui/material'

import { ApiCall } from '../../../contexts'
import { ApiLogEntry } from './ApiLogEntry'

const ApiLogs: React.FC<{ calls: ApiCall[] }> = ({ calls }) => {
  return (
    <>
      <Typography variant="h3" my={2}>
        Api Call Log
      </Typography>
      {calls.length > 0 && calls.map((call, index) => <ApiLogEntry key={index} call={call} />)}
    </>
  )
}

export { ApiLogs }
