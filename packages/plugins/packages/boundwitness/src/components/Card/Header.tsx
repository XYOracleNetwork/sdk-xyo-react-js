import { CardHeader, CardHeaderProps, styled } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { EllipsizeBox } from '@xyo-network/react-shared'
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

  return <CardHeaderHash title={<EllipsizeBox>{hash}</EllipsizeBox>} {...props} />
}

const CardHeaderHash = styled(CardHeader, { name: 'CardHeaderHash' })(({ theme }) => ({
  '& .MuiCardHeader-content': {
    overflow: 'visible',
  },
  '&.MuiCardHeader-root': {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.getContrastText,
  },
}))
