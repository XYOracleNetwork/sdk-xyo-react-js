import { CircularProgress, useTheme } from '@mui/material'
import React from 'react'

import { ErrorsViewer } from './Errors'
import { FlexGrowRow } from './FlexBox'

interface Props {
  errors?: Error[]
  onRetry?: () => void
  opacity?: number | string
  open?: boolean
  paper?: boolean
}

const CoverProgress: React.FC<Props> = (props) => {
  const { paper = true, open, opacity = 0.25, errors, onRetry } = props
  const theme = useTheme()
  if (open) {
    return (
      <FlexGrowRow
        position="absolute"
        margin={-1}
        top={0}
        bottom={0}
        right={0}
        left={0}
        bgcolor={paper ? theme.palette.background.paper : theme.palette.background.default}
      >
        {(errors?.length ?? 0) === 0 ? (
          <CircularProgress style={{ opacity }} />
        ) : (
          <ErrorsViewer margin={1} errors={errors} onRetry={onRetry} />
        )}
      </FlexGrowRow>
    )
  }
  return null
}

export default CoverProgress
