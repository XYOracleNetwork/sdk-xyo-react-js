import { Tab, Tabs, TabsProps } from '@mui/material'
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { FaSignature } from 'react-icons/fa'
import { VscSymbolMethod, VscSymbolNamespace } from 'react-icons/vsc'

export interface BWNavigationTabs extends TabsProps {
  value?: number
  setValue?: Dispatch<SetStateAction<number>>
}

export const BWNavigationTabs: React.FC<BWNavigationTabs> = ({ setValue, value, ...props }) => {
  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue?.(newValue)
  }

  return (
    <Tabs orientation="vertical" value={value} onChange={handleChange} aria-label="BW Vertical tabs" {...props}>
      <Tab sx={{ justifyContent: 'start ' }} label="Payloads" icon={<VscSymbolNamespace />} iconPosition={'start'} />
      <Tab sx={{ justifyContent: 'start ' }} label="Bound Witnesses" icon={<VscSymbolMethod />} iconPosition={'start'} />
      <Tab sx={{ justifyContent: 'start ' }} label="Signatures" icon={<FaSignature />} iconPosition={'start'} />
    </Tabs>
  )
}
