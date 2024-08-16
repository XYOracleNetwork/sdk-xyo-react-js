import { ContentCopy as ContentCopyIcon, Visibility as VisibilityIcon } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { forget } from '@xylabs/forget'
import { ButtonEx } from '@xylabs/react-button'
import { PayloadHasher } from '@xyo-network/hash'
import type { Payload } from '@xyo-network/payload-model'
import type { PropertyAction, PropertyProps } from '@xyo-network/react-property'
import { Property } from '@xyo-network/react-property'
import type { SizeProp } from '@xyo-network/react-shared'
import { usePayloadHash } from '@xyo-network/react-shared'
import React, { useState } from 'react'

import { PayloadHashSourceDetails } from './HashSourceDetails.tsx'

export type PayloadDataDetailsProps = PropertyProps & {
  badge?: boolean
  payload?: Payload
  size?: SizeProp
}

export const PayloadDataDetails: React.FC<PayloadDataDetailsProps> = ({ size, badge, payload, ...props }) => {
  const payloadString = payload ? JSON.stringify(PayloadHasher.hashFields(payload), null, 2) : ''

  const [viewSourceOpen, setViewSourceOpen] = useState(false)
  const hash = usePayloadHash(payload)

  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }

  const actions: PropertyAction[] = [
    {
      icon: <VisibilityIcon />,
      name: 'View',
      onClick: () => setViewSourceOpen(true),
    },
    {
      icon: <ContentCopyIcon />,
      name: 'Copy',
      onClick: () => forget(navigator.clipboard.writeText(hash ?? '')),
    },
  ]

  const onCopy = () => {
    forget(navigator.clipboard.writeText(payloadString))
  }

  return (
    <>
      <Property
        titleProps={{ elevation }}
        badge={badge}
        size={size}
        actions={actions}
        title="Payload Hash"
        value={hash ?? '<Unknown>'}
        tip="This is the payload hash"
        {...props}
      />
      <Dialog open={viewSourceOpen} onClose={() => setViewSourceOpen(false)}>
        <DialogTitle>Hash Source</DialogTitle>
        <DialogContent>
          <PayloadHashSourceDetails noTitle payload={payload} />
        </DialogContent>
        <DialogActions>
          <ButtonEx color="secondary" onClick={onCopy}>
            Copy
          </ButtonEx>
          <ButtonEx color="secondary" onClick={() => setViewSourceOpen(false)}>
            Close
          </ButtonEx>
        </DialogActions>
      </Dialog>
    </>
  )
}
