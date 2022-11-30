import { Typography, useTheme } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useState } from 'react'

import { ApiCallEntry } from './ApiCallEntry'
import { ApiCallTable } from './ApiCallTable'
import { useBuildHistoryData } from './useBuildHistoryData'

export const ApiHistory: React.FC<FlexBoxProps> = (props) => {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()
  const histories = useBuildHistoryData()

  return (
    <FlexCol flexGrow={1} {...props}>
      {visible ? (
        <>
          <ButtonEx variant="contained" size="small" onClick={() => setVisible(false)}>
            Hide Api History
          </ButtonEx>
          {histories?.map((history, index) => (
            <FlexCol flexGrow={1} key={index}>
              <Typography marginTop={1} variant="h6">
                {history.heading}
              </Typography>
              <ApiCallTable sx={{ marginBottom: theme.spacing(4) }}>
                {history.callHistory?.map((response, index) => (
                  <ApiCallEntry bgColor={history.bgColor} call={response} index={index} key={index} />
                ))}
              </ApiCallTable>
            </FlexCol>
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
