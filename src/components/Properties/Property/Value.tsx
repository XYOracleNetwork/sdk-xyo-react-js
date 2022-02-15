import { SxProps, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'

export interface ValueProps {
  value?: string | number | boolean | null
}

const sm = (paddingWidth: string) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: `clamp(75%, 100%, 100vw - ${paddingWidth})`,
})

export const Value: React.FC<ValueProps> = ({ value }) => {
  const [style, setStyle] = useState<SxProps>()
  const { breakpoints, spacing } = useTheme()
  const belowSm = useMediaQuery(breakpoints.down('sm'))

  useEffect(() => {
    if (belowSm) {
      setStyle(sm(spacing(4)))
    } else {
      setStyle(undefined)
    }
  }, [belowSm, spacing])

  return (
    <>
      {value !== undefined ? (
        <Typography sx={style} variant="caption" paddingX={1} fontFamily="monospace" fontWeight="light">
          {value}
        </Typography>
      ) : null}
    </>
  )
}
