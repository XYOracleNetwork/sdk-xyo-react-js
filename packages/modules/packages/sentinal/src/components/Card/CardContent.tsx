import { CardContentProps } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { Payload } from '@xyo-network/payload-model'
import { ModuleCardContent, ModuleRenderProps } from '@xyo-network/react-module'
import { SentinelInstance } from '@xyo-network/sentinel-model'
import React from 'react'
import JsonView from 'react-json-view'

export type SentinelCardContentProps = ModuleRenderProps<SentinelInstance> &
  CardContentProps & {
    report?: Payload[]
  }

export const SentinelCardContent: React.FC<SentinelCardContentProps> = ({ children, report, module, ...props }) => {
  return (
    <ModuleCardContent module={module} {...props}>
      <FlexGrowRow flexWrap="wrap" justifyContent="start" gap={2}>
        {report ?
          <JsonView src={report} />
        : null}
        {children}
      </FlexGrowRow>
    </ModuleCardContent>
  )
}
