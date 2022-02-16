import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { XyoPayload, XyoPayloadWrapper } from '@xyo-network/sdk-xyo-client-js'

import { Property, PropertyHeroProps, usePropertyHeroProps } from '../../Properties'

export interface PayloadDataDetailsProps extends PropertyHeroProps, FlexBoxProps {
  value?: XyoPayload
}

export const PayloadDataDetails: React.FC<PayloadDataDetailsProps> = ({ value, ...props }) => {
  const wrapper = value ? new XyoPayloadWrapper(value) : undefined

  const propertyHeroProps = usePropertyHeroProps(props)
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Property
        title="Payload Hash"
        value={wrapper?.sortedHash() ?? '<Unknown>'}
        tip="This is the payload hash"
        {...propertyHeroProps}
      />
    </FlexCol>
  )
}
