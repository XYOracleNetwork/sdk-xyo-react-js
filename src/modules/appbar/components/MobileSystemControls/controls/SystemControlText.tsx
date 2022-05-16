import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'

interface SystemControlTextProps extends FlexBoxProps {
  value?: string
}

const ControlText: React.FC<SystemControlTextProps> = ({ value, ...props }) => {
  return (
    <FlexCol className={`${props.className} toggle`} {...props}>
      <Typography variant="caption" color="white" fontWeight="bold">
        {value}
      </Typography>
    </FlexCol>
  )
}

export { ControlText }
