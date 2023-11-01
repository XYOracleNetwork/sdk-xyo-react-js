import { Card, CardProps } from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import { Payload } from '@xyo-network/payload-model'
import { ModuleRenderProps } from '@xyo-network/react-module'
import { SentinelInstance } from '@xyo-network/sentinel-model'
import { useState } from 'react'

import { SentinelCardActions } from './CardActions'
import { SentinelCardContent } from './CardContent'
import { SentinelCardHeader } from './CardHeader'

export type SentinelCardProps = CardProps &
  ModuleRenderProps<SentinelInstance> & {
    inPayloads?: Payload[]
  }

export const SentinelCard: React.FC<SentinelCardProps> = ({ children, inPayloads, module, ...props }) => {
  const [retry, setRetry] = useState(-1)
  const [report] = usePromise(async () => {
    if (retry >= 0) {
      return await module?.report(inPayloads)
    }
  }, [module, retry, inPayloads])
  return (
    <Card {...props}>
      <SentinelCardHeader module={module} />
      <SentinelCardContent module={module} report={report} />
      {children}
      <SentinelCardActions module={module} onReport={() => setRetry(retry + 1)} />
    </Card>
  )
}
