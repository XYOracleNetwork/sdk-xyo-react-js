import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoBoundWitnessValidator } from '@xyo-network/sdk-xyo-client-js'

import { Property } from './Properties'

export interface XyoBoundWitnessJsonViewerProps extends FlexBoxProps {
  value?: XyoBoundWitness
}

export const XyoBoundWitnessJsonViewer: React.FC<XyoBoundWitnessJsonViewerProps> = ({ value, ...props }) => {
  const validator = value ? new XyoBoundWitnessValidator(value) : undefined

  const errors = validator?.all() ?? []

  return (
    <FlexCol alignItems="stretch" {...props}>
      <Property title="Block Hash" value={value?._hash ?? '<Unknown>'} tip="This is the block hash" />
      <FlexRow flexWrap="wrap">
        <Property
          flexGrow={1}
          title="Client"
          value={value?._client ?? '<Unknown>'}
          tip="This client used to create this block"
        />
        <Property
          flexGrow={1}
          title="Archive"
          value={value?._archive ?? '<Unknown>'}
          tip="This archive that is storing this block"
        />
        <Property
          flexGrow={1}
          title="User Agent"
          value={value?._user_agent ?? '<Unknown>'}
          tip="The UserAgent from the calling client"
        />
        <Property
          flexGrow={1}
          title="Source IP"
          value={value?._source_ip ?? '<Unknown>'}
          tip="The source ip from the calling client"
        />
        <Property
          flexGrow={1}
          title="Valid"
          value={errors.length === 0 ? 'True' : 'False'}
          tip={
            errors.length > 0 ? (
              <FlexCol>
                {errors.map((error, index) => {
                  return <Typography key={index}>{error.toString()}</Typography>
                })}
              </FlexCol>
            ) : (
              <Typography>No Errors</Typography>
            )
          }
        />
      </FlexRow>
    </FlexCol>
  )
}
