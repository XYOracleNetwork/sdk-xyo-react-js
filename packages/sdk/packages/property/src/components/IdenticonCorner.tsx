import { useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import React, { useMemo, useRef } from 'react'

export interface IdenticonCornerProps extends FlexBoxProps {
  value?: string | number | boolean | null
}

export const IdenticonCorner: React.FC<IdenticonCornerProps> = ({ value, ...props }) => {
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  const parentHeight = useMemo(() => ref.current?.parentElement?.parentElement?.clientHeight, [ref.current])

  const calculatedHeight = parentHeight ?? 0

  return (
    <FlexRow alignItems="flex-start" height="100%">
      <FlexRow background height={calculatedHeight} width={calculatedHeight} borderLeft={`1px solid ${theme.vars.palette.divider}`}>
        <div ref={ref}>
          <Identicon size={calculatedHeight * 0.6} value={`${value}`} sx={{ padding: `${calculatedHeight * 0.2}px` }} {...props} />
        </div>
      </FlexRow>
    </FlexRow>
  )
}
