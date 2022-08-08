import { Typography, useTheme } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'

export interface TokenSummaryProps extends FlexBoxProps {
  icon?: string
  symbol?: string
  imgBgColor?: string
}

export const TokenSummary: React.FC<TokenSummaryProps> = ({ imgBgColor, icon, symbol, children, ...props }) => {
  const theme = useTheme()
  return (
    <>
      <FlexRow paddingBottom={3} width="100%" justifyContent="flex-start" {...props}>
        <FlexCol borderRadius="50%" padding={1} bgcolor={imgBgColor ? imgBgColor : theme.palette.text.primary} height="40px" width="40px">
          <img src={icon} height="25px" />
        </FlexCol>
        <Typography variant="h6" fontWeight={300} textTransform="uppercase" paddingLeft={1}>
          {symbol}
        </Typography>
      </FlexRow>
      {children}
    </>
  )
}
