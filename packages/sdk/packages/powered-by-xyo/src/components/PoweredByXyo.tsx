import { Paper } from '@mui/material'
import { delay } from '@xylabs/delay'
import { forget } from '@xylabs/forget'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ButtonExProps } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { Module } from '@xyo-network/module-model'
import { NodeInstance } from '@xyo-network/node-model'
import { useProvidedNode } from '@xyo-network/react-node'
import { KeyboardEvent, useMemo, useState } from 'react'

import { DebugDialog } from './DebugDialog'
import { PoweredByXyoButton, PoweredByXyoButtonProps } from './PoweredByXyoButton'

export interface PoweredByXyoProps extends FlexBoxProps {
  autoStop?: boolean
  busy?: boolean
  buttonProps?: PoweredByXyoButtonProps
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
  buttonProps = {},
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const busyMap: Record<string, boolean> = useMemo(() => ({}), [node])

  const activeBusy = busy ?? Object.values(busyMap).reduce((prev, value) => prev || value, false)

  const activeOnButtonClick: PoweredByXyoProps['onButtonClick'] =
    (debugDialog
      ? (event) => {
          if (event.shiftKey && event.altKey) {
            setDebugDialogOpen(true)
          } else if (href) {
            window.open(href)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const activeNode = propNode ?? node
      if (disableAnimation) {
        return
      } else if (activeNode) {
        const mods = await activeNode?.resolve()
        mods?.map((mod) => {
          mod.on('moduleBusy', ({ module, busy }) => {
            busyMap[(module as Module).address] = busy
            if (autoStop) {
              forget(
                (async () => {
                  await delay(1000)
                  busyMap[(module as Module).address] = false
                })(),
              )
            }
          })
        })
        activeNode?.on('moduleBusy', ({ module, busy }) => {
          busyMap[(module as Module).address] = busy
          if (autoStop) {
            forget(
              (async () => {
                await delay(1000)
                busyMap[(module as Module).address] = false
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
        <PoweredByXyoButton
          onClick={activeOnButtonClick}
          href={activeHref}
          busy={activeBusy}
          logoHeight={logoHeight}
          logoTextSize={logoTextSize}
          fullWidth
          {...buttonProps}
        />
      </Paper>
      {debugDialog ? (
        <DebugDialog fullScreen open={debugDialogOpen} onClose={() => setDebugDialogOpen(false)} onKeyDown={onKeyDownEscListener} />
      ) : null}
    </FlexCol>
  )
}
