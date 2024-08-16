import { Typography } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { ContainerReflection, ReflectionFlags, ReflectionGroup } from 'typedoc'

import { JsonViewerButton } from '../JsonViewerButton.tsx'
import { resolveChildren } from '../resolveChildren.ts'
import { ReflectionViewer } from './ReflectionViewer.tsx'
import type { FlagFilter, ReflectionViewerProps } from './ReflectionViewerProps.tsx'

export interface ReflectionGroupViewerProps extends ReflectionViewerProps<ContainerReflection> {
  autoScroll?: boolean
  group: ReflectionGroup
  reflection: ContainerReflection
  renderer?: React.FC<ReflectionViewerProps>
}

const hide = (flags?: ReflectionFlags, hiddenFlags: FlagFilter[] = []) => {
  let hide = false
  hiddenFlags.map((hiddenFlag) => {
    if (flags?.[hiddenFlag]) {
      hide = true
    }
  })
  return hide
}

export const ReflectionGroupViewer: React.FC<ReflectionGroupViewerProps> = ({
  autoScroll = false,
  children,
  hiddenFlags,
  group,
  lookup,
  renderer = ReflectionViewer,
  variant,
  ...props
}) => {
  const resolvedChildren = resolveChildren(group, lookup) ?? []

  const visibleChildren
    = hiddenFlags
      ? resolvedChildren.reduce((acc, item) => {
        return acc + (hide(item.flags, hiddenFlags) ? 0 : 1)
      }, 0)
      : 1

  const { hash } = useLocation()
  useEffect(() => {
    if (hash && autoScroll) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash, autoScroll])
  return visibleChildren > 0
    ? (
        <FlexCol title="ReflectionGroupViewer" {...props}>
          <FlexRow marginY={1} justifyContent="flex-start">
            <Typography variant={variant}>{group.title}</Typography>
            <JsonViewerButton size="small" variant="contained" padding={0} marginX={1} src={resolveChildren(group, lookup)} />
          </FlexRow>
          {resolveChildren(group, lookup).map((reflection) => {
            return reflection
              // I wrap this in a div since React does not understand that they have keys using the Renderer
              ? (
                  <div id={reflection.name} key={reflection.id}>
                    {renderer({ hiddenFlags, lookup, margin: 1, padding: 1, reflection })}
                  </div>
                )
              : null
          })}
          {children}
        </FlexCol>
      )
    : null
}
