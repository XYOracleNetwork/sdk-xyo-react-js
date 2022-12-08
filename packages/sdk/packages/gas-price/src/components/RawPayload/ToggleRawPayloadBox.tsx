import { Button, Collapse, Paper } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useState } from 'react'

export interface ToggleRawPayloadBoxProps extends FlexBoxProps {
  gasPricePayload?: object
}

export const ToggleRawPayloadBox: React.FC<ToggleRawPayloadBoxProps> = ({ gasPricePayload, ...props }) => {
  const [collapse, setCollapse] = useState(false)
  return (
    <FlexCol rowGap={1} {...props}>
      <Button variant="contained" onClick={() => setCollapse(!collapse)}>
        Toggle Raw Payload
      </Button>
      <Collapse in={collapse}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <pre>{JSON.stringify(gasPricePayload, null, 2)}</pre>
        </Paper>
      </Collapse>
    </FlexCol>
  )
}
