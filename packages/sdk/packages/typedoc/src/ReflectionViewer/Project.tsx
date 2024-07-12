import { useMemo } from 'react'
import type { ProjectReflection, ReflectionGroup } from 'typedoc'

import { createLookup } from '../createLookup.js'
import { ContainerReflectionViewerProps } from './Container.js'
import { ReflectionGroupViewer } from './ReflectionGroupViewer.js'
import { ReflectionViewer } from './ReflectionViewer.js'

export const ProjectReflectionViewer: React.FC<ContainerReflectionViewerProps<ProjectReflection>> = ({
  reflection,
  hiddenFlags,
  itemRenderer = ReflectionViewer,
  ...props
}) => {
  const lookup = useMemo(() => createLookup(reflection), [reflection])
  return (
    <ReflectionViewer title="ProjectReflectionViewer" hiddenFlags={hiddenFlags} reflection={reflection} {...props}>
      {useMemo(() => {
        return reflection.groups?.map((group: ReflectionGroup) => {
          return (
            <ReflectionGroupViewer
              autoScroll
              variant="h6"
              lookup={lookup}
              key={group.title}
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
