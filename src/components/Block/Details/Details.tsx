import { KeyboardArrowDown } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol, FlexGrowRow, FlexRow } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoBoundWitnessWrapper, XyoPayload } from '@xyo-network/sdk-xyo-client-js'
import { lazy, Suspense } from 'react'

import { Property } from '../../Properties'
import { BlockDataDetails } from './DataDetails'
import { BlockMetaDetails } from './MetaDetails'
import { BlockPayloads, BlockPayloadsProps } from './Payloads'
import { BlockSignatureDetails } from './SignatureDetails'
import { BlockValidationDetails } from './ValidationDetails'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export interface BlockDetailsProps extends FlexBoxProps {
  block?: XyoBoundWitness
  payloads?: XyoPayload[]
  blockPayloadsProps?: BlockPayloadsProps
}

const payloadsFromBlock = (block?: XyoBoundWitness) => {
  const payloads: XyoPayload[] = []
  if (block) {
    for (let i = 0; i < block.payload_hashes.length; i++) {
      if (block._payloads) {
        payloads.push(block._payloads[i])
      } else {
        payloads.push({ _archive: block._archive, _hash: block.payload_hashes[i], schema: block.payload_schemas[i] })
      }
    }
  }
  return payloads
}

export const BlockDetails: React.FC<BlockDetailsProps> = ({ block, payloads, blockPayloadsProps, ...props }) => {
  const blockWrapper = block ? new XyoBoundWitnessWrapper(block) : null

  return (
    <FlexGrowCol justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} {...props}>
      <BlockDataDetails block={block} isHero={true} showBadge={true} />
      <BlockMetaDetails block={block} />
      <BlockSignatureDetails block={block} />
      <BlockPayloads payloads={payloads ?? payloadsFromBlock(block)} {...blockPayloadsProps} />
      <BlockValidationDetails value={block} />
      <FlexCol margin={1} alignItems="stretch">
        <Accordion>
          <AccordionSummary>
            <FlexRow justifyContent="space-between" width="100%">
              <Typography>JSON</Typography>
              <KeyboardArrowDown />
            </FlexRow>
          </AccordionSummary>
          {block ? (
            <AccordionDetails>
              <Property paddingY={2} value={!!block}>
                <Suspense fallback={<FlexGrowRow />}>
                  <JsonView src={block} collapseStringsAfterLength={32} />
                </Suspense>
              </Property>
            </AccordionDetails>
          ) : null}
        </Accordion>
      </FlexCol>
      <FlexCol margin={1} alignItems="stretch">
        <Accordion>
          <AccordionSummary>
            <FlexRow justifyContent="space-between" width="100%">
              <Typography>Hash String Source</Typography>
              <KeyboardArrowDown />
            </FlexRow>
          </AccordionSummary>
          {block ? (
            <AccordionDetails>
              <Property paddingY={2} value={!!block}>
                <FlexRow flexWrap="wrap" width="500px">
                  <Typography
                    fontFamily="monospace"
                    variant="body1"
                    flexWrap="wrap"
                    width="500px"
                    style={{ wordWrap: 'break-word' }}
                  >
                    {blockWrapper?.sortedStringify() ?? ''}
                  </Typography>
                </FlexRow>
              </Property>
            </AccordionDetails>
          ) : null}
        </Accordion>
      </FlexCol>
    </FlexGrowCol>
  )
}
