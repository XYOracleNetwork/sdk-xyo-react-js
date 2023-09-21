import { Paper, Tab, TabProps, Tabs, TabsProps, useTheme } from '@mui/material'
import { BoundWitness, BoundWitnessSchema } from '@xyo-network/boundwitness-model'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { FaSignature } from 'react-icons/fa/index.js'
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc/index.js'

export interface BWNavigationTabs extends TabsProps {
  boundWitness?: BoundWitness
  setValue?: Dispatch<SetStateAction<number>>
  value?: number
}

export const BWNavigationTabs: React.FC<BWNavigationTabs> = ({ setValue, value, boundWitness, ...props }) => {
  const payloadCount = boundWitness?.payload_schemas.filter((schema) => schema !== BoundWitnessSchema).length ?? 0
  const boundWitnessCount = boundWitness?.payload_schemas.filter((schema) => schema === BoundWitnessSchema).length ?? 0
  const signers = boundWitness?.addresses.length ?? 0
  const theme = useTheme()

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue?.(newValue)
  }

  const tabProps: TabProps = {
    iconPosition: 'start',
    sx: { boxShadow: 'none', fontSize: theme.spacing(1.75), justifyContent: 'start', lineHeight: 3, minHeight: 0, overflow: 'hidden' },
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
