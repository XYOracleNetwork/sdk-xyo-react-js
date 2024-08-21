import type { CardProps } from '@mui/material'
import { Card } from '@mui/material'
import { usePromise } from '@xylabs/react-promise'
import type { ModuleRenderProps } from '@xyo-network/react-module'
import type { WitnessInstance } from '@xyo-network/witness-model'
import React, { useState } from 'react'

import { WitnessCardActions } from './CardActions.tsx'
import { WitnessCardContent } from './CardContent.tsx'
import { WitnessCardHeader } from './CardHeader.tsx'

export const WitnessCard: React.FC<CardProps & ModuleRenderProps<WitnessInstance>> = ({
  children, mod, ...props
}) => {
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
