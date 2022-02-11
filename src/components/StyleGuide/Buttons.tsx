import { Button, Typography } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/sdk-react'

export const Buttons: React.FC = ({ ...props }) => {
  return (
    <FlexCol {...props} alignItems="stretch">
      <Typography variant="subtitle1">Buttons</Typography>
      {['text', 'contained', 'outlined'].map((variant) => (
        <FlexCol key={`btn-${variant}`} alignItems="stretch" mb={2}>
          <Typography variant="subtitle2">
            <span style={{ textTransform: 'capitalize' }}>{variant}</span> Buttons
          </Typography>
          <FlexRow alignItems="stretch">
            <Button variant={variant}>Button</Button>&nbsp;
            <Button variant={variant} disabled>
              Disabled
            </Button>
            &nbsp;
            <Button variant={variant} href="#href">
              Link
            </Button>
          </FlexRow>
        </FlexCol>
      ))}
    </FlexCol>
  )
}
