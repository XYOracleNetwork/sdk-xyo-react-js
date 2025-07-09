import { CheckCircleOutline as CheckCircleOutlineIcon, HighlightOff as HighlightOffIcon } from '@mui/icons-material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

/** @public */
export interface PhraseHeaderBoxProps extends FlexBoxProps, PropsWithChildren {
  conditional?: boolean | null
}

/** @public */
export const PhraseHeaderBox: React.FC<PhraseHeaderBoxProps> = ({
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
