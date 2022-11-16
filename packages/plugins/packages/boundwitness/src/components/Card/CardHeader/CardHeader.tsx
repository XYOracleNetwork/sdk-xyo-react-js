import { CardHeader, CardHeaderProps, styled } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { EllipsizeBox } from '@xyo-network/react-shared'
import { useEffect, useState } from 'react'

export interface BoundWitnessCardHeaderProps extends CardHeaderProps {
  payload?: XyoPayload
  active?: boolean
}

export const BoundWitnessCardHeader: React.FC<BoundWitnessCardHeaderProps> = ({ payload, active = false, ...props }) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>
  const [hash, setHash] = useState('')
  useEffect(() => {
    if (boundwitness) {
      setHash(new PayloadWrapper(boundwitness).hash)
    }
  }, [boundwitness])

  return (
    <CardHeaderHash
      active={active}
      title={
        <EllipsizeBox lineHeight={1} typographyProps={{ title: hash }}>
          {hash}
        </EllipsizeBox>
      }
      {...props}
    />
  )
}

interface CardHeaderHashProps extends CardHeaderProps {
  active?: boolean
}

const CardHeaderHash = styled(CardHeader, { name: 'CardHeaderHash', shouldForwardProp: (prop) => prop !== 'active' })<CardHeaderHashProps>(
  ({ theme, active }) => ({
    '& .MuiCardHeader-content': {
      overflow: 'visible',
    },
    '&.MuiCardHeader-root': {
      backgroundColor: active ? theme.palette.info.main : theme.palette.primary.main,
      color: theme.palette.info.contrastText,
    },
    padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
  }),
)
