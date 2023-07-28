import { Paper, Typography } from '@mui/material'
import { useAsyncEffect } from '@xylabs/react-async-effect'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
import { EventUnsubscribeFunction } from '@xyo-network/module-events'
import { useProvidedNode } from '@xyo-network/react-node'
import { useState } from 'react'

import { xyoColorLogoText } from '../img'
import { XyoBusyFlexBox } from './XyoBusyFlexBox'

export interface PoweredByXyoFlexboxProps extends FlexBoxProps {
  disableAnimation?: boolean
  logoHeight?: number
  logoTextSize?: number
}

export const PoweredByXyoFlexbox: React.FC<PoweredByXyoFlexboxProps> = ({
  // leave animation on by default so when done testing, removing the prop lets it work
  disableAnimation = false,
  logoHeight,
  logoTextSize,
  ...props
}) => {
  const [node] = useProvidedNode()
  const [busyCount, setBusyCount] = useState(0)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async () => {
      let unsubscribes: undefined | EventUnsubscribeFunction[]
      if (disableAnimation) {
        return
      } else {
        const mods = await node?.resolve()
        unsubscribes = mods?.map((mod) => {
          return mod.on('moduleBusy', ({ busy }) => {
            if (busy) {
              setBusyCount(busyCount + 1)
            } else {
              setBusyCount(busyCount - 1)
            }
          })
        })
      }
      return () => {
        unsubscribes?.forEach((unsubscribe) => unsubscribe?.())
      }
    },
    [busyCount, disableAnimation, node],
  )

  return (
    <FlexCol alignItems="stretch" position="absolute" bottom="0" left="0" {...props}>
      <LinkEx href="https://xyo.network" target="_blank">
        <Paper sx={{ borderRadius: 0, boxShadow: 0 }}>
          <FlexCol padding={0.5}>
            <Typography style={{ fontSize: logoTextSize ?? 10 }} fontSize="small">
              Powered by
            </Typography>
            <FlexRow>
              <XyoBusyFlexBox busy={!!busyCount} />
              <img src={xyoColorLogoText} height={logoHeight ?? 24} />
            </FlexRow>
          </FlexCol>
        </Paper>
      </LinkEx>
    </FlexCol>
  )
}
