import { Paper, PaperProps, styled, TypographyProps, TypographyVariant } from '@mui/material'
import { EllipsizeBox } from '@xyo-network/react-shared'
import { forwardRef, ReactNode, useRef } from 'react'

type TextSizes = 'small' | 'medium' | 'large'

export interface HeadingPaperProps extends PaperProps {
  heading?: string
  size?: TextSizes
  AdornmentStart?: ReactNode
  AdornmentEnd?: ReactNode
  fallbackText?: string
  IconComponent?: ReactNode
  headingProps?: TypographyProps
}

const HeadingPaper = forwardRef<HTMLDivElement, HeadingPaperProps>(
  ({ heading, AdornmentStart, AdornmentEnd, IconComponent, size = 'medium', fallbackText = 'No heading Provided', headingProps, ...props }, ref) => {
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
      <StyledHeadingPaper hasAdornmentStart={!!AdornmentStart} hasAdornmentEnd={!!AdornmentEnd} elevation={4} ref={ref} {...props}>
        {AdornmentStart}
        {IconComponent}
        <EllipsizeBox width="100%" typographyProps={{ variant: sizeParser(size), ...headingProps }} ref={ellipsizeRef}>
          {heading ? heading : fallbackText}
        </EllipsizeBox>
        {AdornmentEnd}
      </StyledHeadingPaper>
    )
  },
)

HeadingPaper.displayName = 'HeadingPaper'

export { HeadingPaper }

interface StyledHeadingPaperProps extends PaperProps {
  hasAdornmentStart?: boolean
  hasAdornmentEnd?: boolean
}

const StyledHeadingPaper = styled(Paper, { name: 'StyledHeadingPaper' })<StyledHeadingPaperProps>(
  ({ theme, hasAdornmentEnd, hasAdornmentStart }) => ({
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
  }),
)
