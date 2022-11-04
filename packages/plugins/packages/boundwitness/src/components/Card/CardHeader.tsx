import { CardHeader, CardHeaderProps, styled } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { EllipsizeBox } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

export interface BoundWitnessCardHeaderProps extends CardHeaderProps {
  payload?: XyoPayload
}

export const BoundWitnessCardHeader: React.FC<BoundWitnessCardHeaderProps> = ({ payload, ...props }) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>
  const [hash, setHash] = useState('')
  useEffect(() => {
    if (boundwitness) {
      setHash(new PayloadWrapper(boundwitness).hash)
    }
  }, [boundwitness])

  return <CardHeaderHash title={<EllipsizeBox typographyProps={{ title: hash }}>{hash}</EllipsizeBox>} {...props} />
}

const CardHeaderHash = styled(CardHeader, { name: 'CardHeaderHash' })(({ theme }) => ({
  '& .MuiCardHeader-content': {
    overflow: 'visible',
  },
  '&.MuiCardHeader-root': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
  },
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
}))
