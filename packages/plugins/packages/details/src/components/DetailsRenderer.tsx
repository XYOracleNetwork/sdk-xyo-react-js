import { PayloadDetails } from '@xyo-network/react-payload-details'

/** @deprecated use from @xyo-network/react-default-plugin instead */
export const DetailsRenderer = ({ ...props }) => {
  return <PayloadDetails paper {...props} />
}
