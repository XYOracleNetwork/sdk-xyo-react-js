import type { TabProps, TabsProps } from '@mui/material'
import {
  Paper, Tab, Tabs, useTheme,
} from '@mui/material'
import type { BoundWitness } from '@xyo-network/boundwitness-model'
import { BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import type {
  Dispatch, SetStateAction, SyntheticEvent,
} from 'react'
import React from 'react'
// eslint-disable-next-line import-x/no-internal-modules
import { FaSignature } from 'react-icons/fa'
// eslint-disable-next-line import-x/no-internal-modules
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

export interface BWNavigationTabs extends TabsProps {
  boundWitness?: BoundWitness
  setValue?: Dispatch<SetStateAction<number>>
  value?: number
}

export const BWNavigationTabs: React.FC<BWNavigationTabs> = ({
  setValue, value, boundWitness, ...props
}) => {
  const payloadCount = boundWitness?.payload_schemas.filter(schema => schema !== BoundWitnessSchema).length ?? 0
  const boundWitnessCount = boundWitness?.payload_schemas.filter(schema => schema === BoundWitnessSchema).length ?? 0
  const signers = boundWitness?.addresses.length ?? 0
  const theme = useTheme()

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue?.(newValue)
  }

  const tabProps: TabProps = {
    iconPosition: 'start',
    sx: {
      boxShadow: 'none', fontSize: theme.spacing(1.75), justifyContent: 'start', lineHeight: 3, minHeight: 0, overflow: 'hidden',
    },
  }

  return (
    <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="BW Vertical tabs" {...props}>
      <Tab component={Paper} elevation={value === 0 ? 3 : 0} {...tabProps} label={`Payloads - ${payloadCount}`} icon={<VscSymbolNamespace />} />
      <Tab
        component={Paper}
        elevation={value === 1 ? 3 : 0}
        {...tabProps}
        label={`Bound Witnesses - ${boundWitnessCount}`}
        icon={<VscSymbolMethod />}
      />
      <Tab component={Paper} elevation={value === 2 ? 3 : 0} {...tabProps} label={`Signatures - ${signers}`} icon={<FaSignature />} />
    </Tabs>
  )
}
