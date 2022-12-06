import { CardHeader, CardHeaderProps, styled, useTheme } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { PayloadWrapper, XyoPayload } from '@xyo-network/payload'
import { ReactNode, useEffect, useState } from 'react'

import { BWActions, BWHeading } from '../../_shared'

export interface BoundWitnessCardHeaderProps extends CardHeaderProps {
  payload?: XyoPayload
  active?: boolean
  activeBgColor?: boolean
  hideJSONButton?: boolean
  hideValidation?: boolean
  hidePreviousHash?: boolean
  additionalActions?: ReactNode
}

export const BoundWitnessCardHeader: React.FC<BoundWitnessCardHeaderProps> = ({
  payload,
  active = false,
  activeBgColor = true,
  additionalActions,
  hideJSONButton,
  hideValidation,
  hidePreviousHash,
  ...props
}) => {
  const boundwitness = payload as XyoPayload<XyoBoundWitness>
  const theme = useTheme()
  const [hash, setHash] = useState('')

  useEffect(() => {
    if (boundwitness) {
      setHash(new PayloadWrapper(boundwitness).hash)
    }
  }, [boundwitness])

  return (
    <CardHeaderHash
      active={active}
      activeBgColor={activeBgColor}
      title={
        <BWHeading
          heading={hash}
          IconComponent={
            <Identicon
              size={parseInt(theme.spacing(2.5).replace('px', ''))}
              p={0.5}
              value={hash}
              sx={{ background: theme.palette.background.paper }}
            />
          }
        />
      }
      action={
        <BWActions
          hideJSONButton={hideJSONButton}
          hideValidation={hideValidation}
          hidePreviousHash={hidePreviousHash}
          boundwitness={boundwitness}
          additionalActions={additionalActions}
        />
      }
      {...props}
    />
  )
}

interface CardHeaderHashProps extends CardHeaderProps {
  active?: boolean
  activeBgColor?: boolean
}

const CardHeaderHash = styled(CardHeader, {
  name: 'CardHeaderHash',
  shouldForwardProp: (prop) => !['active', 'activeBgColor'].includes(prop as string),
})<CardHeaderHashProps>(({ theme, active, activeBgColor }) => ({
  '& .MuiCardHeader-action': {
    marginBottom: 0,
    marginTop: 0,
  },
  '& .MuiCardHeader-content': {
    overflow: 'visible',
  },
  '&.MuiCardHeader-root': {
    backgroundColor: active && activeBgColor ? theme.palette.info.main : theme.palette.primary.main,
    color: theme.palette.info.contrastText,
  },
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
}))
