import { ArrayType } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps'
import { buildTypeString } from './buildTypeString'

export const buildArrayString = (
  parts: string[],
  typeObj: ArrayType,
  reflectionViewer: React.FC<ReflectionViewerProps>
) => {
  const typeString = buildTypeString(typeObj.elementType, reflectionViewer)
  if (typeof typeString === 'string') {
    parts.push(typeString)
  }
  parts.push('[]')
}
