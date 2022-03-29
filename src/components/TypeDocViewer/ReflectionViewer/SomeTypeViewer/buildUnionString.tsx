import { UnionType } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps'
import { buildTypeString } from './buildTypeString'

export const buildUnionString = (
  parts: string[],
  typeObj: UnionType,
  reflectionViewer: React.FC<ReflectionViewerProps>
) => {
  if (typeObj.types) {
    parts.push(
      typeObj.types
        .map((arg) => {
          return buildTypeString(arg, reflectionViewer)
        })
        .join(' | ')
    )
  }
}
