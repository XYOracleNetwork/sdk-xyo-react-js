import { styled } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'

export interface PaperAdornmentProps extends FlexBoxProps {
  clickable?: boolean
}

export const PaperAdornment = styled(FlexCol, {
  name: 'PaperAdornment',
  shouldForwardProp: (prop: string) => !['clickable'].includes(prop),
})<PaperAdornmentProps>(({
  theme, clickable,
}) => ({
  backgroundColor: theme.palette.secondary.dark,
  cursor: clickable ? 'pointer' : 'auto',
}))
