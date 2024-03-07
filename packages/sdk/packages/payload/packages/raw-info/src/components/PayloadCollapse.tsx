import { Button, Chip, Collapse, CollapseProps, Typography } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import { Payload } from '@xyo-network/payload-model'

import { JsonViewEx } from './shared'
import { StyledChipLabel } from './styled'

export interface RawInfoPayloadCollapse extends CollapseProps {
  expandedJson?: boolean
  payload?: Payload | null
  updateExpandedJson?: (expanded: boolean) => void
}

export const RawInfoPayloadCollapse: React.FC<RawInfoPayloadCollapse> = ({ expandedJson, payload, updateExpandedJson, ...props }) => {
  const [hash] = usePromise(async () => (payload ? await PayloadBuilder.dataHash(payload) : undefined), [payload])

  return (
    <>
      {payload ?
        <FlexRow>
          <Button onClick={() => updateExpandedJson?.(!expandedJson)} size="small" variant="outlined">
            Show Raw JSON
          </Button>
        </FlexRow>
      : null}
      <Collapse in={expandedJson} {...props}>
        {payload ?
          <FlexCol alignItems="stretch" gap={1.5}>
            <Typography sx={{ lineHeight: 1 }}>Payload Hash:</Typography>
            <Chip label={<StyledChipLabel>{hash}</StyledChipLabel>} sx={{ alignSelf: 'start' }} />
            <JsonViewEx src={payload} />
          </FlexCol>
        : null}
      </Collapse>
    </>
  )
}
