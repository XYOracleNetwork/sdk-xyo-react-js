import { PayloadDetails } from '@xyo-network/react-payload-details'
import React from 'react'

export const DetailsRenderer = ({ ...props }) => {
  return <PayloadDetails paper {...props} />
}
