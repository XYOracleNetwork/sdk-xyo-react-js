import { Typography } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import React from 'react'

import { JsonViewerButton } from '../JsonViewerButton.tsx'
import type { ReflectionGroupViewerProps } from '../ReflectionViewer/index.ts'
import { ReflectionViewer } from '../ReflectionViewer/index.ts'
import { resolveChildren } from '../resolveChildren.ts'

export const ReflectionGroupTreeViewer: React.FC<ReflectionGroupViewerProps> = ({
  variant,
  group,
  children,
  lookup,
  renderer = ReflectionViewer,
  ...props
}) => {
  return (
    <FlexCol {...props}>
      <FlexRow marginY={1} justifyContent="flex-start">
        <Typography variant={variant}>{group.title}</Typography>
        <JsonViewerButton size="small" variant="contained" padding={0} marginX={1} src={resolveChildren(group, lookup)} />
      </FlexRow>
      {resolveChildren(group, lookup).map((reflection) => {
        return reflection
        // I wrap this in a div since React does not understand that they have keys using the Renderer
          ? (
              <div key={reflection.id}>
                {renderer({
                  lookup, margin: 1, reflection,
                }) as React.ReactNode}
              </div>
            )
          : null
      })}
      {children}
    </FlexCol>
  )
}
