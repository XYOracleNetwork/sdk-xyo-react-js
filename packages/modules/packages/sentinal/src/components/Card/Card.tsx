import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import type { Payload } from '@xyo-network/payload-model'
import type { ModuleRenderProps } from '@xyo-network/react-module'
import type { SentinelInstance } from '@xyo-network/sentinel-model'
import React, { useState } from 'react'

import { SentinelCardActions } from './CardActions.tsx'
import { SentinelCardContent } from './CardContent.tsx'
import { SentinelCardHeader } from './CardHeader.tsx'

export type SentinelCardProps = CardProps &
  ModuleRenderProps<SentinelInstance> & {
    inPayloads?: Payload[]
  }

export const SentinelCard: React.FC<SentinelCardProps> = ({
  children, inPayloads, mod, ...props
}) => {
  const [retry, setRetry] = useState(-1)
  const [report] = usePromise(async () => {
    if (retry >= 0) {
      return await mod?.report(inPayloads)
    }
  }, [mod, retry, inPayloads])
  return (
    <Card {...props}>
      <SentinelCardHeader mod={mod} />
      <SentinelCardContent mod={mod} report={report} />
      {children}
      <SentinelCardActions mod={mod} onReport={() => setRetry(retry + 1)} />
    </Card>
  )
}
