import { Paper, PaperProps, styled } from '@mui/material'
import { forwardRef } from 'react'

import { BWHeading } from '../Heading.js'
import { BWHeadingProps } from '../HeadingProps.js'

export interface HeadingPaperProps extends BWHeadingProps {
  paperProps?: PaperProps
}

const HeadingPaper = forwardRef<HTMLDivElement, HeadingPaperProps>((props, ref) => {
  const { AdornmentStart, AdornmentEnd, paperProps } = props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { paperProps: excludedPaperProps, ...bwHeadingProps } = props
  return (
    <StyledHeadingPaper hasAdornmentStart={!!AdornmentStart} hasAdornmentEnd={!!AdornmentEnd} elevation={4} ref={ref} {...paperProps}>
      <BWHeading {...bwHeadingProps} />
    </StyledHeadingPaper>
  )
})

HeadingPaper.displayName = 'HeadingPaper'

export { HeadingPaper }

interface StyledHeadingPaperProps extends PaperProps {
  hasAdornmentEnd?: boolean
  hasAdornmentStart?: boolean
}

const StyledHeadingPaper = styled(Paper, {
  name: 'StyledHeadingPaper',
  shouldForwardProp: (prop) => !['hasAdornmentEnd', 'hasAdornmentStart', 'paperProps'].includes(prop as string),
})<StyledHeadingPaperProps>(({ hasAdornmentEnd, hasAdornmentStart, theme }) => ({
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
