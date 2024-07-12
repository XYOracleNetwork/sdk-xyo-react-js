import { Card, CardProps } from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import { ModuleRenderProps } from '@xyo-network/react-module'
import { WitnessInstance } from '@xyo-network/witness-model'
import { useState } from 'react'

import { WitnessCardActions } from './CardActions.js'
import { WitnessCardContent } from './CardContent.js'
import { WitnessCardHeader } from './CardHeader.js'

export const WitnessCard: React.FC<CardProps & ModuleRenderProps<WitnessInstance>> = ({ children, mod, ...props }) => {
  const [retry, setRetry] = useState(-1)
  const [observation] = usePromise(async () => {
    if (retry >= 0) {
      return await mod?.observe()
    }
  }, [mod, retry])
  return (
    <Card {...props}>
      <WitnessCardHeader mod={mod} />
      <WitnessCardContent mod={mod} observation={observation} />
      {children}
      <WitnessCardActions mod={mod} onObserve={() => setRetry(retry + 1)} />
    </Card>
  )
}
