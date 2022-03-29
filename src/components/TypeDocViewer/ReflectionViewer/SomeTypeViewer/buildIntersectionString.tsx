import { IntersectionType } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps'
import { buildTypeString } from './buildTypeString'

export const buildIntersectionString = (
  parts: string[],
  typeObj: IntersectionType,
  reflectionViewer: React.FC<ReflectionViewerProps>
) => {
  if (typeObj.types) {
    parts.push(
      typeObj.types
        .map((arg) => {
          return buildTypeString(arg, reflectionViewer)
        })
        .join(' & ')
    )
  }
}
