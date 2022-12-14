import { styled, Tab, Tabs, TabsProps } from '@mui/material'
import { XyoBoundWitness, XyoBoundWitnessSchema } from '@xyo-network/boundwitness'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'
import { FaSignature } from 'react-icons/fa'
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

export interface BWNavigationTabs extends TabsProps {
  value?: number
  setValue?: Dispatch<SetStateAction<number>>
  boundWitness?: XyoBoundWitness
}

export const BWNavigationTabs: React.FC<BWNavigationTabs> = ({ setValue, value, boundWitness, ...props }) => {
  const payloadCount = boundWitness?.payload_schemas.filter((schema) => schema !== XyoBoundWitnessSchema).length ?? 0
  const boundWitnessCount = boundWitness?.payload_schemas.filter((schema) => schema === XyoBoundWitnessSchema).length ?? 0
  const signers = boundWitness?.addresses.length ?? 0

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue?.(newValue)
  }

  return (
    <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="BW Vertical tabs" {...props}>
      <StyledTab label={`Payloads - ${payloadCount}`} icon={<VscSymbolNamespace />} iconPosition={'start'} />
      <StyledTab label={`Bound Witnesses - ${boundWitnessCount}`} icon={<VscSymbolMethod />} iconPosition={'start'} />
      <StyledTab label={`Signatures - ${signers}`} icon={<FaSignature />} iconPosition={'start'} />
    </Tabs>
  )
}

const StyledTab = styled(Tab, { name: 'StyledTab' })(({ theme }) => ({
  fontSize: theme.spacing(1.75),
  justifyContent: 'start',
  lineHeight: 3,
  minHeight: 0,
}))
