import { Paper } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { ButtonExProps } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { NodeInstance } from '@xyo-network/node-model'
import { useProvidedNode } from '@xyo-network/react-node'
import { useState } from 'react'

import { PoweredByXyoButton } from './PoweredByXyoButton'

export interface PoweredByXyoProps extends FlexBoxProps {
  busy?: boolean
  disableAnimation?: boolean
  href?: ButtonExProps['href']
  logoHeight?: number
  logoTextSize?: number
  node?: NodeInstance
  onButtonClick?: ButtonExProps['onClick']
}

export const PoweredByXyo: React.FC<PoweredByXyoProps> = ({
  // leave animation on by default so when done testing, removing the prop lets it work
  busy,
  disableAnimation = false,
  href = 'https://xyo.network',
  logoHeight,
  logoTextSize,
  onButtonClick,
  node: propNode,
  ...props
}) => {
  const [node] = useProvidedNode()
  const [busyCount, setBusyCount] = useState(0)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      const activeNode = propNode ?? node
      if (disableAnimation) {
        return
      } else if (activeNode) {
        const mods = await activeNode?.resolve()
        mods?.map((mod) => {
          mod.on('moduleBusy', ({ busy }) => {
            if (busy) {
              setBusyCount(busyCount + 1)
            } else {
              setBusyCount(busyCount - 1)
            }
          })
        })
        activeNode?.on('moduleBusy', ({ busy }) => {
          if (busy) {
            setBusyCount(busyCount + 1)
          } else {
            setBusyCount(busyCount - 1)
          }
        })
      }
    },
    [busyCount, disableAnimation, propNode, node],
  )

  return (
    <FlexCol alignItems="stretch" position="absolute" bottom="0" left="0" {...props}>
      <Paper sx={{ borderRadius: 0 }}>
        <PoweredByXyoButton onClick={onButtonClick} href={href} busy={busy ?? !!busyCount} logoHeight={logoHeight} logoTextSize={logoTextSize} />
      </Paper>
    </FlexCol>
  )
}
