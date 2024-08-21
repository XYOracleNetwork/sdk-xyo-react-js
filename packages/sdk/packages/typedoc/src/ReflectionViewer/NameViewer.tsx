import type { TypographyVariant } from '@mui/material'
import {
  Chip, Stack, Typography,
} from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import { JsonViewerButton } from '../JsonViewerButton.tsx'
import type { SomeReflection } from '../SomeReflection.ts'
import { trimFlagLabel } from '../trimFlagLabel.ts'
import type { ReflectionViewerProps } from './ReflectionViewerProps.tsx'
import { SomeTypeViewer } from './SomeTypeViewer/index.ts'

export interface NameViewerProps extends FlexBoxProps {
  reflection: SomeReflection
  reflectionViewer: React.FC<ReflectionViewerProps>
  variant?: TypographyVariant
}

export const NameViewer: React.FC<NameViewerProps> = ({
  reflectionViewer, variant, reflection, ...props
}) => {
  return (
    <FlexRow justifyContent="flex-start" {...props}>
      <FlexRow marginRight={1}>
        <Typography variant={variant} noWrap>
          {reflection.name}
          {reflection.type
            ? <>:&nbsp;</>
            : null}
        </Typography>
        <SomeTypeViewer reflection={reflection} reflectionViewer={reflectionViewer} />
      </FlexRow>
      <Stack direction="row" spacing={1}>
        <Chip size="small" label={reflection.kind} />
        {reflection.flags
          ? Object.entries(reflection.flags).map(([flag, value]) => {
            return value ? <Chip size="small" key={flag} label={trimFlagLabel(flag)} variant="outlined" /> : null
          })
          : null}
      </Stack>
      {document && document?.location.hostname === 'localhost' && (
        <JsonViewerButton size="small" variant="contained" padding={0} marginX={1} src={reflection} />
      )}
    </FlexRow>
  )
}
