import { CardHeader, CardHeaderProps, styled, useTheme } from '@mui/material'
import { Identicon } from '@xylabs/react-identicon'
import { BoundWitness } from '@xyo-network/boundwitness-model'
import { Payload } from '@xyo-network/payload-model'
import { usePayloadHash } from '@xyo-network/react-shared'
import React, { forwardRef, ReactNode } from 'react'

import { BWActions, BWHeading } from '../../_shared/index.js'

export interface BoundWitnessCardHeaderProps extends CardHeaderProps {
  active?: boolean
  activeBgColor?: boolean
  additionalActions?: ReactNode
  hideJSONButton?: boolean
  hidePreviousHash?: boolean
  hideTimestamp?: boolean
  hideValidation?: boolean
  payload?: Payload
}

export const BoundWitnessCardHeader = forwardRef<HTMLElement, BoundWitnessCardHeaderProps>(
  ({
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
    const boundwitness = payload as Payload<BoundWitness>
    const theme = useTheme()
    const hash = usePayloadHash(boundwitness)

    return (
      <CardHeaderHash
        active={active}
        activeBgColor={activeBgColor}
        title={(
          <BWHeading
            heading={hash}
            IconComponent={(
              <Identicon
                size={Number.parseInt(theme.spacing(2.5).replace('px', ''))}
                p={0.5}
                value={hash}
                sx={{ background: theme.palette.background.paper }}
              />
            )}
          />
        )}
        action={(
          <BWActions
            hideJSONButton={hideJSONButton}
            hideValidation={hideValidation}
            hidePreviousHash={hidePreviousHash}
            hideTimestamp={hideTimestamp}
            boundwitness={boundwitness}
            additionalActions={additionalActions}
          />
        )}
        {...props}
      />
    )
  },
)

BoundWitnessCardHeader.displayName = 'BoundWitnessCardHeader'

interface CardHeaderHashProps extends CardHeaderProps {
  active?: boolean
  activeBgColor?: boolean
}

const CardHeaderHash = styled(CardHeader, {
  name: 'CardHeaderHash',
  shouldForwardProp: prop => !['active', 'activeBgColor'].includes(prop as string),
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
  'padding': `${theme.spacing(0.5)} ${theme.spacing(2)}`,
}))
