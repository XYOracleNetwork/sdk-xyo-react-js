import React from 'react'
import type { ReflectionType } from 'typedoc'

import type { ReflectionViewerProps } from '../ReflectionViewerProps.tsx'

export const buildReflectionString = (typeObj: ReflectionType, reflectionViewer: React.FC<ReflectionViewerProps>) => {
  if (typeObj.declaration) {
    return <>{reflectionViewer({ reflection: typeObj.declaration })}</>
  }
}
