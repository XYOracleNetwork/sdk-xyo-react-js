import { Typography, useTheme } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
export interface TokenBarProps {
  text1?: string | number
  text2?: string | number
}

export const TokenBar: React.FC<TokenBarProps> = ({ text1, text2 }) => {
  const theme = useTheme()
  return (
    <FlexGrowRow width="100%" paddingY={1} paddingX={2} bgcolor={theme.palette.background.paper} borderRadius={1} justifyContent="space-between">
      <Typography variant="body1" fontWeight={300}>
        {text1}
      </Typography>
      <Typography variant="body1" fontWeight={300} textTransform="uppercase" color="gray" paddingLeft={2}>
        {text2}
      </Typography>
    </FlexGrowRow>
  )
}
