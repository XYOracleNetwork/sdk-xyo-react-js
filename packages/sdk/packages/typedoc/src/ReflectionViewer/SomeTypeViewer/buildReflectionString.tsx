import type { ReflectionType } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps'

export const buildRelfectionString = (typeObj: ReflectionType, reflectionViewer: React.FC<ReflectionViewerProps>) => {
  if (typeObj.declaration) {
    return <>{reflectionViewer({ reflection: typeObj.declaration })}</>
  }
}
