import { alpha, Typography, useTheme } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { useDarkMode } from 'storybook-dark-mode'
interface GrayBarProps {
  text1?: string | number
  text2?: string | number
}

export const GrayTokenBar: React.FC<GrayBarProps> = ({ text1, text2 }) => {
  const theme = useTheme()
  const darkMode = useDarkMode()
  return (
    <FlexGrowRow
      width="100%"
      paddingY={1}
      paddingX={2}
      bgcolor={darkMode ? theme.palette.background.paper : alpha(theme.palette.grey[200], 0.3)}
      borderRadius={1}
      justifyContent="space-between"
    >
      <Typography variant="body1" fontWeight={300}>
        {text1}
      </Typography>
      <Typography variant="body1" fontWeight={300} textTransform="uppercase" color="gray" paddingLeft={2}>
        {text2}
      </Typography>
    </FlexGrowRow>
  )
}
