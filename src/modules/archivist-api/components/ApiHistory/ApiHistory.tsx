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

  const histories = [
    {
      bgColor: lighten(theme.palette.success.light, 0.85),
      callHistory: successHistory,
      heading: 'Successes',
    },
    {
      bgColor: lighten(theme.palette.error.light, 0.85),
      callHistory: failureHistory,
      heading: 'Failures',
    },
    {
      bgColor: lighten(theme.palette.error.light, 0.85),
      callHistory: errorHistory,
      heading: 'Errors',
    },
    {
      bgColor: lighten(theme.palette.info.light, 0.85),
      callHistory: responseHistory,
      heading: 'Responses',
    },
  ]

  return (
    <FlexCol flexGrow={1} {...props}>
      {visible ? (
        <>
          <ButtonEx variant="contained" size="small" onClick={() => setVisible(false)}>
            Hide Api History
          </ButtonEx>
          {histories?.map((history, index) => (
            <>
              <Typography marginY={1} variant="h6" key={index}>
                {history.heading}
              </Typography>
              <ApiCallTable sx={{ marginBottom: theme.spacing(2) }}>
                {history.callHistory?.map((response, index) => (
                  <ApiCallEntry bgColor={history.bgColor} call={response} index={index} key={index} />
                ))}
              </ApiCallTable>
            </>
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
