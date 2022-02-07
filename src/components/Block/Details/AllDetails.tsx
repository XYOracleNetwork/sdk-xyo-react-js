import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexRow, QuickTipButton } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoBoundWitnessValidator } from '@xyo-network/sdk-xyo-client-js'

import { Property } from '../../Properties'
import { BlockMetaDetails } from './MetaDetails'

export interface AllBlockDetailsProps extends FlexBoxProps {
  value?: XyoBoundWitness
}

export const AllBlockDetails: React.FC<AllBlockDetailsProps> = ({ value, ...props }) => {
  const validator = value ? new XyoBoundWitnessValidator(value) : undefined

  const errors = validator?.all() ?? []

  return (
    <FlexCol alignItems="stretch" {...props}>
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Data</Typography>
        <QuickTipButton title="Block Data">
          The protocol fields for the block. All these fields are used to generate the hash.
        </QuickTipButton>
      </FlexRow>
      <Property title="Block Hash" value={value?._hash ?? '<Unknown>'} tip="This is the block hash" />
      <FlexRow margin={1} justifyContent="flex-start">
        <Typography>Meta</Typography>
        <QuickTipButton title="Block Meta">The meta fields added to the record by the archivist</QuickTipButton>
      </FlexRow>
      <BlockMetaDetails value={value} />
      <FlexRow flexWrap="wrap">
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
