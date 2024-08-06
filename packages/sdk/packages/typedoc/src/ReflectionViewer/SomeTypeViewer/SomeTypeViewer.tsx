import { Typography, TypographyProps } from '@mui/material'
import React from 'react'

import { SomeReflection } from '../../SomeReflection.ts'
import { ReflectionViewerProps } from '../ReflectionViewerProps.tsx'
import { buildTypeString } from './buildTypeString.tsx'

export interface SomeTypeViewerProps extends TypographyProps {
  opacity?: number
  reflection: SomeReflection
  reflectionViewer: React.FC<ReflectionViewerProps>
}

export const SomeTypeViewer: React.FC<SomeTypeViewerProps> = ({ opacity = 0.5, reflection, reflectionViewer, ...props }) => {
  const typeReactNode = reflection.type ? buildTypeString(reflection.type, reflectionViewer) : ''
  if (typeof typeReactNode === 'string') {
    return (
      <Typography title="SomeTypeViewer" style={{ opacity }} {...props}>
        {typeReactNode}
      </Typography>
    )
  }
  return <>{typeReactNode}</>
}
