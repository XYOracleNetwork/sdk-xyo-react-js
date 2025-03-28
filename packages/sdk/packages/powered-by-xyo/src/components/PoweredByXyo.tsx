import { Paper } from '@mui/material'
import { delay } from '@xylabs/delay'
import { forget } from '@xylabs/forget'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import type { ButtonExProps } from '@xylabs/react-button'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import type { Module } from '@xyo-network/module-model'
import type { NodeInstance } from '@xyo-network/node-model'
import { useProvidedNode } from '@xyo-network/react-node'
import type { KeyboardEvent } from 'react'
import React, { useMemo, useState } from 'react'

import { DebugDialog } from './DebugDialog.tsx'
import type { PoweredByXyoButtonProps } from './PoweredByXyoButton.tsx'
import { PoweredByXyoButton } from './PoweredByXyoButton.tsx'

export interface PoweredByXyoProps extends FlexBoxProps {
  autoStop?: boolean
  busy?: boolean
  buttonProps?: Omit<PoweredByXyoButtonProps, 'href' | 'to' | 'toOptions'>
  debugDialog?: boolean
  disableAnimation?: boolean
  href?: ButtonExProps['href']
  logoHeight?: number
  logoTextSize?: number
  node?: NodeInstance
  onButtonClick?: ButtonExProps['onClick']
}

export const PoweredByXyo: React.FC<PoweredByXyoProps> = ({
  autoStop,
  busy,
  buttonProps,
  debugDialog = false,
  disableAnimation = false,
  href = 'https://xyo.network',
  logoHeight,
  logoTextSize,
  onButtonClick,
  node: propNode,
  ...props
}) => {
  const [node] = useProvidedNode()
  const [debugDialogOpen, setDebugDialogOpen] = useState(false)

  const busyMap: Record<string, boolean> = useMemo(() => ({}), [node])

  const activeBusy = busy ?? Object.values(busyMap).includes(true)

  const activeOnButtonClick: PoweredByXyoProps['onButtonClick']
    = (debugDialog
      ? (event) => {
          if (event.shiftKey && event.altKey) {
            setDebugDialogOpen(true)
          } else if (href) {
            window.open(href, undefined, 'noopener,noreferrer')
          }
        }
      : undefined) ?? onButtonClick

  const activeHref = activeOnButtonClick ? undefined : href

  const onKeyDownEscListener = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && debugDialogOpen) {
      setDebugDialogOpen(false)
    }
  }

  useAsyncEffect(
    async () => {
      const activeNode = propNode ?? node
      if (disableAnimation) {
        return
      } else if (activeNode) {
        const mods = await activeNode?.resolve('*')
        mods?.map((mod) => {
          return mod.on('moduleBusy', ({ mod, busy }) => {
            busyMap[(mod as Module).address] = busy
            if (autoStop) {
              forget(
                (async () => {
                  await delay(1000)
                  busyMap[(mod as Module).address] = false
                })(),
              )
            }
          })
        })
        activeNode?.on('moduleBusy', ({ mod, busy }) => {
          busyMap[(mod as Module).address] = busy
          if (autoStop) {
            forget(
              (async () => {
                await delay(1000)
                busyMap[(mod as Module).address] = false
              })(),
            )
          }
        })
      }
    },
    [disableAnimation, propNode, node, busyMap, autoStop],
  )

  return (
    <FlexCol alignItems="stretch" position="absolute" bottom="0" left="0" {...props}>
      <Paper sx={{ borderRadius: 0 }}>
        {activeHref
          ? (
              <PoweredByXyoButton
                onClick={activeOnButtonClick}
                href={activeHref}
                busy={activeBusy}
                logoHeight={logoHeight}
                logoTextSize={logoTextSize}
                fullWidth
                {...buttonProps}
              />
            )
          : (
              <PoweredByXyoButton
                onClick={activeOnButtonClick}
                busy={activeBusy}
                logoHeight={logoHeight}
                logoTextSize={logoTextSize}
                fullWidth
                {...buttonProps}
              />
            )}
      </Paper>
      {debugDialog && debugDialogOpen
        ? <DebugDialog fullScreen open={debugDialogOpen} onClose={() => setDebugDialogOpen(false)} onKeyDown={onKeyDownEscListener} />
        : null}
    </FlexCol>
  )
}
