import { useTheme } from '@mui/material'
import { FlexBoxProps, FlexGrowCol } from '@xylabs/react-flexbox'
import { TypographyEx } from '@xyo-network/react-shared'

export interface SpeedBoxProps extends FlexBoxProps {
  speed?: string
}

export const SpeedBox: React.FC<SpeedBoxProps> = ({ speed, ...props }) => {
  const theme = useTheme()

  return (
    <FlexGrowCol {...props}>
      {speed && (
        <TypographyEx fontSize={theme.spacing(3)} p={1}>
          {speed?.toUpperCase()}
        </TypographyEx>
      )}
    </FlexGrowCol>
  )
}
