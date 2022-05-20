import { useTheme } from '@mui/material'
import { FlexBoxProps, FlexRow, Identicon } from '@xylabs/sdk-react'
import { useEffect, useRef, useState } from 'react'

export interface IdenticonCornerProps extends FlexBoxProps {
  value?: string | number | boolean | null
}

export const IdenticonCorner: React.FC<IdenticonCornerProps> = ({ value, ...props }) => {
  const theme = useTheme()
  const [parentHeight, setParentHeight] = useState<number>()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setParentHeight(ref.current?.parentElement?.parentElement?.clientHeight)
  }, [])

  const calculatedHeight = parentHeight ?? 0

  return (
    <FlexRow alignItems="flex-start" height="100%" position="absolute" right={0} bottom={0}>
      <FlexRow background height={calculatedHeight} width={calculatedHeight} borderTop={`1px solid ${theme.palette.divider}`} borderLeft={`1px solid ${theme.palette.divider}`}>
        <div ref={ref}>
          <Identicon size={calculatedHeight * 0.6} value={`${value}`} sx={{ padding: `${calculatedHeight * 0.2}px` }} {...props} />
        </div>
      </FlexRow>
    </FlexRow>
  )
}
