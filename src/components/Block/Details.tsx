import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { FlexBoxProps, FlexCol, FlexGrowCol, FlexGrowRow, FlexRow } from '@xylabs/sdk-react'
import { XyoBoundWitness, XyoBoundWitnessWrapper, XyoPayload } from '@xyo-network/sdk-xyo-client-js'
import { lazy, Suspense } from 'react'

import { PayloadTable } from '../Payload'
import { Property } from '../Properties'
import { XyoBoundWitnessJsonViewer } from '../XyoBoundWitnessJsonViewer'

const JsonView = lazy(() => import(/* webpackChunkName: "jsonView" */ 'react-json-view'))

export interface BlockDetailsProps extends FlexBoxProps {
  block?: XyoBoundWitness
  payloads?: XyoPayload[]
}

export const BlockDetails: React.FC<BlockDetailsProps> = ({ block, payloads, ...props }) => {
  const blockWrapper = block ? new XyoBoundWitnessWrapper(block) : null
  return (
    <FlexGrowCol justifyContent="flex-start" alignItems="stretch" marginTop={2} marginBottom={8} {...props}>
      <XyoBoundWitnessJsonViewer value={block} marginY={2} />
      <Property paddingY={2} value={!!block}>
        <PayloadTable payloads={payloads ?? []} />
      </Property>
      <FlexCol margin={1} alignItems="stretch">
        <Accordion>
          <AccordionSummary>
            <FlexRow justifyContent="space-between" width="100%">
              <Typography>JSON</Typography>
              <KeyboardArrowDownIcon />
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
              <KeyboardArrowDownIcon />
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
