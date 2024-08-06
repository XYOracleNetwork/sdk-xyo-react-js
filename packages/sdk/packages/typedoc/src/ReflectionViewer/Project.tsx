import React, { useMemo } from 'react'
import type { ProjectReflection, ReflectionGroup } from 'typedoc'

import { createLookup } from '../createLookup.ts'
import { ContainerReflectionViewerProps } from './Container.tsx'
import { ReflectionGroupViewer } from './ReflectionGroupViewer.tsx'
import { ReflectionViewer } from './ReflectionViewer.tsx'

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
