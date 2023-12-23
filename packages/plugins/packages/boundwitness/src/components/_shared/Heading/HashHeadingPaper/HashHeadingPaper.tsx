import { useTheme } from '@mui/material'
import { Identicon, IdenticonProps } from '@xylabs/react-identicon'
import { forwardRef } from 'react'

import { HeadingPaper, HeadingPaperProps } from '../HeadingPaper'

export interface HashHeadingPaperProps extends HeadingPaperProps {
  hash?: string
  identiconProps?: IdenticonProps
}

const HashHeadingPaper = forwardRef<HTMLDivElement, HashHeadingPaperProps>(({ hash, identiconProps, ...props }, ref) => {
  const theme = useTheme()

  return (
    <HeadingPaper
      heading={hash}
      fallbackText={'No hash provided'}
      ref={ref}
      IconComponent={
        hash ? (
          <Identicon
            size={Number.parseInt(theme.spacing(3).replace('px', ''))}
            p={0.25}
            value={hash}
            sx={{ background: theme.palette.background.paper }}
            {...identiconProps}
          />
        ) : null
      }
      sx={{ columnGap: 1 }}
      {...props}
    />
  )
})

HashHeadingPaper.displayName = 'HashHeadingPaper'

export { HashHeadingPaper }
