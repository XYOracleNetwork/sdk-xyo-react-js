import { Typography } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/sdk-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ContainerReflection, ReflectionFlags, ReflectionGroup } from 'typedoc'

import { JsonViewerButton } from '../JsonViewerButton'
import { resolveChildren } from '../resolveChildren'
import { ReflectionViewer } from './ReflectionViewer'
import { FlagFilter, ReflectionViewerProps } from './ReflectionViewerProps'

export interface ReflectionGroupViewerProps extends ReflectionViewerProps<ContainerReflection> {
  reflection: ContainerReflection
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer?: React.FC<ReflectionViewerProps>
  group: ReflectionGroup
  autoscroll?: boolean
}

export const ReflectionGroupViewer: React.FC<ReflectionGroupViewerProps> = ({
  variant,
  group,
  children,
  lookup,
  autoscroll = false,
  renderer = ReflectionViewer,
  hiddenFlags,
  ...props
}) => {
  const hide = (flags?: ReflectionFlags, hiddenFlags: FlagFilter[] = []) => {
    let hide = false
    hiddenFlags.map((hiddenFlag) => {
      if (flags?.[hiddenFlag]) {
        hide = true
      }
    })
    return hide
  }

  const resolvedChildern = resolveChildren(group, lookup) ?? []

  const visibleChildren = hiddenFlags
    ? resolvedChildern.reduce((acc, item) => {
        return acc + (hide(item.flags, hiddenFlags) ? 0 : 1)
      }, 0)
    : 1

  const { hash } = useLocation()
  useEffect(() => {
    if (hash && autoscroll) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash, autoscroll])
  return visibleChildren > 0 ? (
    <FlexCol title="ReflectionGroupViewer" {...props}>
      <FlexRow marginY={1} justifyContent="flex-start">
        <Typography variant={variant}>{group.title}</Typography>
        <JsonViewerButton jsonViewProps={{ collapsed: 1 }} size="small" variant="contained" padding={0} marginX={1} src={resolveChildren(group, lookup)} />
      </FlexRow>
      {resolveChildren(group, lookup).map((reflection) => {
        return reflection ? (
          // I wrap this in a div since React does not understand that they have keys using the Renderer
          <div id={reflection.name} key={reflection.id}>
            {renderer({ hiddenFlags, lookup, margin: 1, padding: 1, reflection })}
          </div>
        ) : null
      })}
      {children}
    </FlexCol>
  ) : null
}
