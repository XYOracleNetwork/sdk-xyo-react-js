import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import type { ModuleInstance } from '@xyo-network/module-model'
import React from 'react'

export interface ModuleAccordionProps<T extends ModuleInstance = ModuleInstance> extends Omit<AccordionProps, 'children'> {
  mod?: T
}

import type { AccordionProps } from '@mui/material'
import {
  Accordion, AccordionDetails, AccordionSummary,
} from '@mui/material'

import { ModuleDetails } from './ModuleDetails.tsx'
import { TypedModuleSummary } from './TypedModuleSummary.tsx'

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({ mod, ...props }) => {
  return (
    <Accordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <TypedModuleSummary mod={mod} />
      </AccordionSummary>
      <AccordionDetails>
        <ModuleDetails mod={mod} />
      </AccordionDetails>
    </Accordion>
  )
}
