import { XyoBoundWitness } from '@xyo-network/core'
import { ArchiveProperty } from '@xyo-network/react-archive'
import { Property, PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export interface BlockMetaDetails extends PropertyGroupProps {
  block?: XyoBoundWitness
  archivePath?: string
}

export const BlockMetaDetails: React.FC<BlockMetaDetails> = ({ block, archivePath, ...props }) => {
  return (
    <PropertyGroup title="Meta" tip="The meta fields added to the record by the archivist" {...props}>
      {block?._client ? <Property flexGrow={1} title="Client" value={block?._client} tip="This client used to create this block" /> : null}
      {block?._archive ? <ArchiveProperty flexGrow={1} payload={block} path={archivePath} /> : null}
      {block?._timestamp ? <Property flexGrow={1} title="Timestamp" value={block?._timestamp} tip="This timestamp of the payload" /> : null}
      {block?._user_agent ? <Property flexGrow={1} title="User Agent" value={block?._user_agent} tip="The UserAgent from the calling client" /> : null}
      {block?._source_ip ? <Property flexGrow={1} title="Source IP" value={block?._source_ip} tip="The source ip from the calling client" /> : null}
    </PropertyGroup>
  )
}
