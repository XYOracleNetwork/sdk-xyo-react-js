import { useTheme } from '@mui/material'
import type { IdenticonProps } from '@xylabs/react-identicon'
import { Identicon } from '@xylabs/react-identicon'
import React from 'react'

import type { HeadingPaperProps } from '../HeadingPaper/index.ts'
import { HeadingPaper } from '../HeadingPaper/index.ts'

export interface HashHeadingPaperProps extends HeadingPaperProps {
  hash?: string
  identiconProps?: IdenticonProps
}

const HashHeadingPaper = ({
  ref, hash, identiconProps, ...props
}: HashHeadingPaperProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const theme = useTheme()

  return (
    <HeadingPaper
      heading={hash}
      fallbackText="No hash provided"
      ref={ref}
      IconComponent={
        hash
          ? (
              <Identicon
                size={Number.parseInt(theme.spacing(3).replace('px', ''))}
                p={0.25}
                value={hash}
                sx={{ background: theme.palette.background.paper }}
                {...identiconProps}
              />
            )
          : null
      }
      sx={{ columnGap: 1 }}
      {...props}
    />
  )
}

HashHeadingPaper.displayName = 'HashHeadingPaper'

export { HashHeadingPaper }
