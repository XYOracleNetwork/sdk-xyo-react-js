import BackArrow from '@mui/icons-material/ArrowBackRounded'
import { IconButtonProps } from '@mui/material'

import { PaperAdornmentIconButton } from './PaperAdornmentIconButton'

type BackPaperAdornmentProps = IconButtonProps

export const BackPaperAdornment: React.FC<BackPaperAdornmentProps> = (props) => (
  <PaperAdornmentIconButton {...props}>
    <BackArrow />
  </PaperAdornmentIconButton>
)
