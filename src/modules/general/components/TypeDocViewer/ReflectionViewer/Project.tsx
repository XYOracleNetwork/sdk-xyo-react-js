import { useMemo } from 'react'
import { ProjectReflection } from 'typedoc'

import { createLookup } from '../createLookup'
import { ContainerReflectionViewerProps } from './Container'
import { ReflectionGroupViewer } from './ReflectionGroupViewer'
import { ReflectionViewer } from './ReflectionViewer'

export const ProjectReflectionViewer: React.FC<ContainerReflectionViewerProps<ProjectReflection>> = ({ reflection, hiddenFlags, itemRenderer = ReflectionViewer, ...props }) => {
  const lookup = useMemo(() => createLookup(reflection), [reflection])
  return (
    <ReflectionViewer title="ProjectReflectionViewer" hiddenFlags={hiddenFlags} reflection={reflection} {...props}>
      {useMemo(() => {
        return reflection.groups?.map((group) => {
          return (
            <ReflectionGroupViewer
              autoscroll
              variant="h6"
              lookup={lookup}
              key={group.kind}
              renderer={itemRenderer}
              group={group}
              reflection={reflection}
              alignItems="stretch"
              hiddenFlags={hiddenFlags}
            />
          )
        })
      }, [lookup, reflection, hiddenFlags, itemRenderer])}
    </ReflectionViewer>
  )
}
