import type { ReflectionType } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps.js'

export const buildReflectionString = (typeObj: ReflectionType, reflectionViewer: React.FC<ReflectionViewerProps>) => {
  if (typeObj.declaration) {
    return <>{reflectionViewer({ reflection: typeObj.declaration })}</>
  }
}
