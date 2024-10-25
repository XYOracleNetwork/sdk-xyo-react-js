import { CheckCircleOutline as CheckCircleOutlineIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

interface PhraseHeaderBox extends FlexBoxProps, PropsWithChildren {
  conditional?: boolean | null
}

export const PhraseHeaderBox: React.FC<PhraseHeaderBox> = ({
  children, conditional, ...props
}) => {
  const state = useMemo(() => {
    switch (conditional) {
      case true: {
        return 'success'
      }
      case false: {
        return 'error'
      }
      default: {
        return null
      }
    }
  }, [conditional])

  const Icon = useMemo(() => {
    switch (state) {
      case 'success': {
        return <CheckCircleOutlineIcon fontSize="small" color="success" />
      }
      case 'error': {
        return <HighlightOffIcon fontSize="small" color="error" />
      }
      default: {
        return null
      }
    }
  }, [state])

  return (
    <FlexRow justifyContent="start" columnGap={1} {...props}>
      {Icon}
      {children}
    </FlexRow>
  )
}
