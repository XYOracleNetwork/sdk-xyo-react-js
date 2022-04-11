import { Typography } from '@mui/material'
import { ButtonEx, FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { useState } from 'react'

import { useArchivistApi } from '../../contexts'
import { ApiCallEntry } from './ApiCallEntry'

export const ApiHistory: React.FC<FlexBoxProps> = (props) => {
  const { errorHistory, responseHistory, successHistory, failureHistory } = useArchivistApi()
  const [visible, setVisible] = useState(false)

  return (
    <FlexCol {...props}>
      {visible ? (
        <>
          <ButtonEx variant="contained" size="small" onClick={() => setVisible(false)}>
            Hide Api History
          </ButtonEx>
          <Typography marginY={2} variant="h6">
            Successes
          </Typography>
          {successHistory?.map((response, index) => (
            <ApiCallEntry call={response} index={index + 1} key={index} />
          ))}
          <Typography marginY={2} variant="h6">
            Failures
          </Typography>
          {failureHistory?.map((response, index) => (
            <ApiCallEntry call={response} index={index + 1} key={index} />
          ))}
          <Typography marginY={2} variant="h6">
            Responses
          </Typography>
          {responseHistory?.map((response, index) => (
            <ApiCallEntry call={response} index={index + 1} key={index} />
          ))}
          <Typography marginY={2} variant="h6">
            Errors
          </Typography>
          {errorHistory?.map((error, index) => (
            <ApiCallEntry call={error} index={index + 1} key={index} />
          ))}
        </>
      ) : (
        <ButtonEx variant="contained" size="small" onClick={() => setVisible(true)}>
          Show Api History
        </ButtonEx>
      )}
    </FlexCol>
  )
}
