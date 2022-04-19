import { ContainerReflection } from 'typedoc'

import { createLookup } from '../createLookup'
import { ReflectionGroupViewer } from './ReflectionGroupViewer'
import { ReflectionViewer } from './ReflectionViewer'
import { ReflectionViewerProps } from './ReflectionViewerProps'

export interface ContainerReflectionViewerProps<T extends ContainerReflection = ContainerReflection> extends ReflectionViewerProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemRenderer?: React.FC<ReflectionViewerProps<any>>
}

export const ContainerReflectionViewer: React.FC<ContainerReflectionViewerProps> = ({ children, reflection, hiddenFlags, itemRenderer = ReflectionViewer, ...props }) => {
  const lookup = createLookup(reflection)

  return (
    <ReflectionViewer title="ContainerReflectionViewer" sources reflection={reflection} lookup={lookup} {...props}>
      {reflection.groups?.map((group) => {
        return (
          <ReflectionGroupViewer
            margin={1}
            lookup={lookup}
            renderer={itemRenderer}
            key={group.kind}
            group={group}
            reflection={reflection}
            hiddenFlags={hiddenFlags}
            alignItems="stretch"
          />
        )
      })}
      {children}
    </ReflectionViewer>
  )
}
