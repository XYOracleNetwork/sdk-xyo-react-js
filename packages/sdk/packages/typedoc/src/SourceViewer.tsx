import { Typography } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'
import type { SourceReference } from 'typedoc'

export interface SourceViewerProps extends FlexBoxProps {
  source: SourceReference
}

export const SourceViewer: React.FC<SourceViewerProps> = ({ source, ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Typography style={{ opacity: 0.5 }} variant="body2">
        <i>{source.fileName}</i>
      </Typography>
    </FlexCol>
  )
}
