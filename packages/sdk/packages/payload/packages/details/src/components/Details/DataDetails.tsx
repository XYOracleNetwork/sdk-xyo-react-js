import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { Payload } from '@xyo-network/payload-model'
import { PayloadWrapper } from '@xyo-network/payload-wrapper'
import { Property, PropertyAction, PropertyProps } from '@xyo-network/react-property'
import { SizeProp, usePayloadHash } from '@xyo-network/react-shared'
import { useState } from 'react'

import { PayloadHashSourceDetails } from './HashSourceDetails'

export type PayloadDataDetailsProps = PropertyProps & {
  badge?: boolean
  payload?: Payload
  size?: SizeProp
}

export const PayloadDataDetails: React.FC<PayloadDataDetailsProps> = ({ size, badge, payload, ...props }) => {
  const wrapper = payload ? PayloadWrapper.wrap(payload) : undefined

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
      onClick: async () => await navigator.clipboard.writeText(hash ?? ''),
    },
  ]

  const onCopy = async () => {
    await navigator.clipboard.writeText(wrapper?.stringified ?? '')
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
