import { CardHeader, CardHeaderProps } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { useEffect, useState } from 'react'

export interface BoundWitnessCardHeaderProps extends CardHeaderProps {
  boundwitness?: XyoPayload<XyoBoundWitness>
}

export const BoundWitnessCardHeader: React.FC<BoundWitnessCardHeaderProps> = ({ boundwitness, ...props }) => {
  const [hash, setHash] = useState('')
  useEffect(() => {
    if (boundwitness) {
      setHash(new PayloadWrapper(boundwitness).hash)
    }
  }, [boundwitness])

  return <CardHeader title={hash} {...props} />
}
