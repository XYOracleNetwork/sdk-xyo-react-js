import type { CollapseProps } from '@mui/material'
import {
  Button, Chip, Collapse, Typography,
} from '@mui/material'
import type { JsonValue } from '@xylabs/object'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { PayloadBuilder } from '@xyo-network/payload-builder'
import { isAnyPayload } from '@xyo-network/payload-model'
import { useDataState } from '@xyo-network/react-shared'
import React from 'react'

import type { ExpansionProps } from '../../../lib/index.ts'
import { StyledChipLabel } from '../../styled/index.ts'
import { JsonViewerEx } from '../JsonViewerEx.tsx'

export interface RawInfoPayloadCollapse extends CollapseProps, ExpansionProps {
  jsonValue?: JsonValue
}

export const JsonViewerCollapse: React.FC<RawInfoPayloadCollapse> = ({
  defaultExpandedJson, jsonValue, updateExpandedJson, ...props
}) => {
  const [expandedJson, setExpandedJson] = useDataState(defaultExpandedJson)

  const [hash] = usePromise(async () => {
    if (!jsonValue || !isAnyPayload(jsonValue)) return
    return await PayloadBuilder.dataHash(jsonValue)
  }, [jsonValue])

  const actionText = expandedJson ? 'Hide JSON' : 'Show JSON'

  const handleExpansion = () => {
    updateExpandedJson?.(!expandedJson)
    setExpandedJson(!expandedJson)
  }

  return (
    <>
      {jsonValue
        ? (
            <FlexRow>
              <Button onClick={handleExpansion} size="small" variant="outlined">
                {actionText}
              </Button>
            </FlexRow>
          )
        : null}
      <Collapse in={expandedJson} {...props}>
        {jsonValue
          ? (
              <FlexCol alignItems="stretch" gap={1.5}>
                <Typography sx={{ lineHeight: 1 }}>Payload Hash:</Typography>
                {hash
                  ? <Chip label={<StyledChipLabel>{hash}</StyledChipLabel>} sx={{ alignSelf: 'start' }} />
                  : null}
                <JsonViewerEx value={jsonValue} />
              </FlexCol>
            )
          : null}
      </Collapse>
    </>
  )
}
