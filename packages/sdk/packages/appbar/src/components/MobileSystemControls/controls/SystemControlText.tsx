import { Typography } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

interface SystemControlTextProps extends FlexBoxProps {
  value?: string
}

const ControlText: React.FC<SystemControlTextProps> = ({
  value, ...props
}) => {
  return (
    <FlexCol className={`${props.className} toggle`} {...props}>
      <Typography variant="caption" color="white" fontWeight="bold">
        {value}
      </Typography>
    </FlexCol>
  )
}

export { ControlText }
