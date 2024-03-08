import { Button, Chip, Collapse, CollapseProps, Typography } from '@mui/material'
import { JsonObject } from '@xylabs/object'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import { isAnyPayload } from '@xyo-network/payload-model'
import { useDataState } from '@xyo-network/react-shared'

import { ExpansionProps } from '../../../lib'
import { StyledChipLabel } from '../../styled'
import { JsonViewerEx } from '../JsonViewerEx'

export interface RawInfoPayloadCollapse extends CollapseProps, ExpansionProps {
  jsonObject?: JsonObject | null
}

export const JsonViewerCollapse: React.FC<RawInfoPayloadCollapse> = ({ defaultExpandedJson, jsonObject, updateExpandedJson, ...props }) => {
  const [expandedJson, setExpandedJson] = useDataState(defaultExpandedJson)
  const [hash] = usePromise(async () => {
    if (!jsonObject || !isAnyPayload(jsonObject)) return
    return await PayloadBuilder.dataHash(jsonObject)
  }, [jsonObject])
  const actionText = expandedJson ? 'Hide JSON' : 'Show JSON'

  const handleExpansion = () => {
    updateExpandedJson?.(!expandedJson)
    setExpandedJson(!expandedJson)
  }

  return (
    <>
      {jsonObject ?
        <FlexRow>
          <Button onClick={handleExpansion} size="small" variant="outlined">
            {actionText}
          </Button>
        </FlexRow>
      : null}
      <Collapse in={expandedJson} {...props}>
        {jsonObject ?
          <FlexCol alignItems="stretch" gap={1.5}>
            <Typography sx={{ lineHeight: 1 }}>Payload Hash:</Typography>
            {hash ?
              <Chip label={<StyledChipLabel>{hash}</StyledChipLabel>} sx={{ alignSelf: 'start' }} />
            : null}
            <JsonViewerEx value={jsonObject} />
          </FlexCol>
        : null}
      </Collapse>
    </>
  )
}
