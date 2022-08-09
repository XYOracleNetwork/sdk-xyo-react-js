import { Paper, PaperProps, Typography } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
export interface TokenBarProps extends PaperProps {
  text1?: string | number
  text2?: string | number
}

export const TokenBar: React.FC<TokenBarProps> = ({ text1, text2, ...props }) => {
  return (
    <Paper elevation={0} className="TokenBar-root" {...props}>
      <FlexRow justifyContent="space-between">
        <Typography variant="body1" fontWeight={300} margin={1}>
          {text1}
        </Typography>
        <Typography variant="body1" fontWeight={300} textTransform="uppercase" color="gray" margin={1}>
          {text2}
        </Typography>
      </FlexRow>
    </Paper>
  )
}
