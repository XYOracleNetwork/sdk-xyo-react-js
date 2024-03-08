import { Button, Chip, Collapse, CollapseProps, Typography } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import { Payload } from '@xyo-network/payload-model'
import { useDataState } from '@xyo-network/react-shared'

import { ExpansionProps } from '../../../lib'
import { StyledChipLabel } from '../../styled'
import { JsonViewerEx } from '../JsonViewerEx'

export interface RawInfoPayloadCollapse extends CollapseProps, ExpansionProps {
  payload?: Payload | null
}

export const RawInfoPayloadCollapse: React.FC<RawInfoPayloadCollapse> = ({ defaultExpandedJson, payload, updateExpandedJson, ...props }) => {
  const [expandedJson, setExpandedJson] = useDataState(defaultExpandedJson)
  const [hash] = usePromise(async () => (payload ? await PayloadBuilder.dataHash(payload) : undefined), [payload])
  const actionText = expandedJson ? 'Hide JSON' : 'Show JSON'

  const handleExpansion = () => {
    updateExpandedJson?.(!expandedJson)
    setExpandedJson(!expandedJson)
  }

  return (
    <>
      {payload ?
        <FlexRow>
          <Button onClick={handleExpansion} size="small" variant="outlined">
            {actionText}
          </Button>
        </FlexRow>
      : null}
      <Collapse in={expandedJson} {...props}>
        {payload ?
          <FlexCol alignItems="stretch" gap={1.5}>
            <Typography sx={{ lineHeight: 1 }}>Payload Hash:</Typography>
            <Chip label={<StyledChipLabel>{hash}</StyledChipLabel>} sx={{ alignSelf: 'start' }} />
            <JsonViewerEx value={payload} />
          </FlexCol>
        : null}
      </Collapse>
    </>
  )
}
