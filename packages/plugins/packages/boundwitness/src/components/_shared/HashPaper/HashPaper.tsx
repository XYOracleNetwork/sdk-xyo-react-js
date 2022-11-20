import { Paper, PaperProps, styled, TypographyVariant, useTheme } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { EllipsizeBox } from '@xyo-network/react-shared'
import { forwardRef, ReactNode, useRef } from 'react'

type TextSizes = 'small' | 'medium' | 'large'

export interface HashPaperProps extends PaperProps {
  hash?: string
  size?: TextSizes
  AdornmentStart?: ReactNode
  AdornmentEnd?: ReactNode
  fallbackText?: string
}

const HashPaper = forwardRef<HTMLDivElement, HashPaperProps>(
  ({ hash, AdornmentStart, AdornmentEnd, size = 'medium', fallbackText = 'No hash Provided', ...props }, ref) => {
    const theme = useTheme()
    const ellipsizeRef = useRef<HTMLDivElement | null>(null)
    const sizeParser = (size: TextSizes) => {
      const map: Record<TextSizes, TypographyVariant> = {
        large: 'h4',
        medium: 'body1',
        small: 'caption',
      }
      const mappedSize = map[size]
      if (mappedSize === undefined) {
        throw Error(`${size} is not a recognized TextSize`)
      }
      return mappedSize
    }
    return (
      <StyledHashPaper hasAdornmentStart={!!AdornmentStart} hasAdornmentEnd={!!AdornmentEnd} elevation={4} ref={ref} {...props}>
        {AdornmentStart}
        {hash ? (
          <Identicon
            size={parseInt(theme.spacing(1.75).replace('px', ''))}
            p={0.25}
            value={hash}
            sx={{ background: theme.palette.background.paper }}
          />
        ) : null}
        <EllipsizeBox width="100%" typographyProps={{ variant: sizeParser(size) }} ref={ellipsizeRef}>
          {hash ? hash : fallbackText}
        </EllipsizeBox>
        {AdornmentEnd}
      </StyledHashPaper>
    )
  },
)

HashPaper.displayName = 'HashPaper'

export { HashPaper }

interface StyledHashPaperProps extends PaperProps {
  hasAdornmentStart?: boolean
  hasAdornmentEnd?: boolean
}

const StyledHashPaper = styled(Paper, { name: 'StyledHashPaper' })<StyledHashPaperProps>(({ theme, hasAdornmentEnd, hasAdornmentStart }) => ({
  alignItems: 'center',
  columnGap: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  padding: theme.spacing(1),
  ...(hasAdornmentStart && { paddingLeft: 0 }),
  ...(hasAdornmentEnd && { paddingRight: 0 }),
  ...((hasAdornmentStart || hasAdornmentEnd) && { paddingBottom: 0, paddingTop: 0 }),
  paddingRight: theme.spacing(1),
}))
