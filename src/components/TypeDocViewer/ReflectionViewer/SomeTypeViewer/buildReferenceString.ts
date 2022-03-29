import { ReferenceType } from 'typedoc'

import { ReflectionViewerProps } from '../ReflectionViewerProps'
import { buildTypeString } from './buildTypeString'

export const buildReferenceString = (
  parts: string[],
  typeObj: ReferenceType,
  reflectionViewer: React.FC<ReflectionViewerProps>
) => {
  parts.push(typeObj.name)
  if (typeObj.typeArguments) {
    parts.push('<')
    parts.push(
      typeObj.typeArguments
        .map((arg) => {
          return buildTypeString(arg, reflectionViewer)
        })
        .join(', ')
    )
    parts.push('>')
  }
}
