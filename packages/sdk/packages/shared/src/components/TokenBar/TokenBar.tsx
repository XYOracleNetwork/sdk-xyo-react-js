import type { PaperProps, TypographyProps } from '@mui/material'
import { Paper, Typography } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import type { ReactNode } from 'react'
import React from 'react'
export interface TokenBarProps extends PaperProps {
  text1?: ReactNode
  text1Props?: TypographyProps
  text1Suffix?: ReactNode
  text2?: ReactNode
  text2Props?: TypographyProps
  text2Suffix?: ReactNode
}

export const TokenBar: React.FC<TokenBarProps> = ({ text1, text1Props, text1Suffix, text2, text2Props, text2Suffix, ...props }) => {
  return (
    <Paper elevation={0} className="TokenBar-root" {...props}>
      <FlexRow justifyContent="space-between">
        <Typography variant="body1" fontWeight={300} margin={1} {...text1Props}>
          {text1}
          {text1Suffix}
        </Typography>
        <Typography variant="body1" fontWeight={300} textTransform="uppercase" color="gray" margin={1} {...text2Props}>
          {text2}
          {text2Suffix}
        </Typography>
      </FlexRow>
    </Paper>
  )
}
