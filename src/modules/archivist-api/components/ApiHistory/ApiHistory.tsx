import { lighten, Typography, useTheme } from '@mui/material'
import { ButtonEx, FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { useState } from 'react'

import { useArchivistApi } from '../../contexts'
import { ApiCallEntry } from './ApiCallEntry'
import { ApiCallTable } from './ApiCallTable'

export const ApiHistory: React.FC<FlexBoxProps> = (props) => {
  const { errorHistory, responseHistory, successHistory, failureHistory } = useArchivistApi()
  const [visible, setVisible] = useState(false)
  const theme = useTheme()

  return (
    <FlexCol flexGrow={1} {...props}>
      {visible ? (
        <>
          <ButtonEx variant="contained" size="small" onClick={() => setVisible(false)}>
            Hide Api History
          </ButtonEx>
          <Typography marginY={1} variant="h6">
            Successes
          </Typography>
          <ApiCallTable sx={{ marginBottom: theme.spacing(2) }}>
            {successHistory?.map((response, index) => (
              <ApiCallEntry
                bgColor={lighten(theme.palette.success.light, 0.85)}
                call={response}
                index={index}
                key={index}
              />
            ))}
          </ApiCallTable>

          <Typography marginY={1} variant="h6">
            Failures
          </Typography>
          <ApiCallTable>
            {failureHistory?.map((response, index) => (
              <ApiCallEntry
                bgColor={lighten(theme.palette.error.light, 0.85)}
                call={response}
                index={index + 1}
                key={index}
              />
            ))}
          </ApiCallTable>
          <Typography marginY={1} variant="h6">
            Responses
          </Typography>
          <ApiCallTable>
            {responseHistory?.map((response, index) => (
              <ApiCallEntry
                bgColor={lighten(theme.palette.info.light, 0.85)}
                call={response}
                index={index + 1}
                key={index}
              />
            ))}
          </ApiCallTable>
          <Typography marginY={1} variant="h6">
            Errors
          </Typography>
          <ApiCallTable>
            {errorHistory?.map((error, index) => (
              <ApiCallEntry
                bgColor={lighten(theme.palette.error.light, 0.85)}
                call={error}
                index={index + 1}
                key={index}
              />
            ))}
          </ApiCallTable>
        </>
      ) : (
        <ButtonEx variant="contained" size="small" onClick={() => setVisible(true)}>
          Show Api History
        </ButtonEx>
      )}
    </FlexCol>
  )
}
