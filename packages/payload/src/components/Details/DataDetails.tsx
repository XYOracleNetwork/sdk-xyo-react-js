import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { ButtonEx, FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/core'
import { Property, PropertyAction, SizeProp, usePropertyHeroProps } from '@xyo-network/react-property'
import { useState } from 'react'

import { PayloadHashSourceDetails } from './HashSourceDetails'

export interface PayloadDataDetailsProps extends FlexBoxProps {
  value?: XyoPayload
  size?: SizeProp
  badge?: boolean
}

export const PayloadDataDetails: React.FC<PayloadDataDetailsProps> = ({ size, badge, value, ...props }) => {
  const wrapper = value ? new XyoPayloadWrapper(value) : undefined

  const propertyHeroProps = usePropertyHeroProps(props)
  const [viewSourceOpen, setViewSourceOpen] = useState(false)
  const hash = wrapper?.hash

  const actions: PropertyAction[] = [
    {
      icon: <VisibilityIcon />,
      name: 'View',
      onClick: () => setViewSourceOpen(true),
    },
    {
      icon: <ContentCopyIcon />,
      name: 'Copy',
      onClick: async () => await navigator.clipboard.writeText(wrapper?.hash ?? ''),
    },
  ]

  const onCopy = async () => {
    await navigator.clipboard.writeText(wrapper?.stringified ?? '')
  }

  return (
    <FlexCol alignItems="stretch" {...props}>
      <Property badge={badge} size={size} actions={actions} title="Payload Hash" value={hash ?? '<Unknown>'} tip="This is the payload hash" {...propertyHeroProps} />
      <Dialog open={viewSourceOpen} onClose={() => setViewSourceOpen(false)}>
        <DialogTitle>Hash Source</DialogTitle>
        <DialogContent>
          <PayloadHashSourceDetails noTitle payload={value} />
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
    </FlexCol>
  )
}
