import { XyoPayloadWithPartialMeta } from '@xyo-network/payload'
import { ArchiveProperty } from '@xyo-network/react-archive'
import { Property, PropertyGroup, PropertyGroupProps } from '@xyo-network/react-property'

export type PayloadMetaDetailsProps = PropertyGroupProps & {
  value?: XyoPayloadWithPartialMeta
  archivePath?: string
}

export const PayloadMetaDetails: React.FC<PayloadMetaDetailsProps> = ({ archivePath, value, ...props }) => {
  let elevation = 2
  if (props.paper) {
    elevation += props.elevation ?? 0
  }
  return (
    <PropertyGroup titleProps={{ elevation }} title="Meta" tip="The meta fields added to the record by the archivist" {...props}>
      {value?._client ? (
        <Property titleProps={{ elevation }} flexGrow={1} title="Client" value={value?._client ?? '<Unknown>'} tip="This client used to create this payload" />
      ) : null}
      {value?._archive ? <ArchiveProperty titleProps={{ elevation }} flexGrow={1} payload={value} path={archivePath} /> : null}
      {value?._reportedHash ? (
        <Property
          titleProps={{ elevation }}
          flexGrow={1}
          title="Reported Hash"
          value={value?._reportedHash ?? '<Unknown>'}
          tip="The has reported by the payload"
        />
      ) : null}
      {value?._timestamp ? (
        <Property titleProps={{ elevation }} flexGrow={1} title="Timestamp" value={value?._timestamp ?? '<Unknown>'} tip="This timestamp of the payload" />
      ) : null}
      {value?._observeDuration ? (
        <Property
          titleProps={{ elevation }}
          flexGrow={1}
          title="Observation Duration"
          value={value?._observeDuration ?? '<Unknown>'}
          tip="This duration of time observed by the witness"
        />
      ) : null}
    </PropertyGroup>
  )
}
