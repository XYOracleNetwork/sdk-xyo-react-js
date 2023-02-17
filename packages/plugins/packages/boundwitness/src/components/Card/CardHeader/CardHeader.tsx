import { CardHeader, CardHeaderProps, styled, useTheme } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { XyoBoundWitness } from '@xyo-network/boundwitness-model'
import { XyoPayload } from '@xyo-network/payload-model'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { ReactNode, useEffect, useState } from 'react'

import { BWActions, BWHeading } from '../../_shared'

export interface BoundWitnessCardHeaderProps extends CardHeaderProps {
  active?: boolean
  activeBgColor?: boolean
  additionalActions?: ReactNode
  hideJSONButton?: boolean
  hidePreviousHash?: boolean
  hideTimestamp?: boolean
  hideValidation?: boolean
  payload?: XyoPayload
}

export const BoundWitnessCardHeader: React.FC<BoundWitnessCardHeaderProps> = ({
  active = false,
  activeBgColor = true,
  additionalActions,
  hideJSONButton,
  hidePreviousHash,
  hideTimestamp,
  hideValidation,
  payload,
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
          hideTimestamp={hideTimestamp}
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
    ...(active && activeBgColor && { backgroundColor: theme.palette.info.dark }),
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
}))
