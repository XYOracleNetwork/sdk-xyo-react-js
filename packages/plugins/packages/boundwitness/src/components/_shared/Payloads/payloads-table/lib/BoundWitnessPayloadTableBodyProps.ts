import { PayloadTableBodyProps } from '@xyo-network/react-payload-table'

export interface BoundWitnessPayloadTableBodyProps extends PayloadTableBodyProps {
  payloadHashes?: string[]
  payloadSchemas?: string[]
}
