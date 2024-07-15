import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { ModuleInstance } from '@xyo-network/module-model'

export interface ModuleAccordionProps<T extends ModuleInstance = ModuleInstance> extends Omit<AccordionProps, 'children'> {
  mod?: T
}

import { Accordion, AccordionDetails, AccordionProps, AccordionSummary } from '@mui/material'

import { ModuleDetails } from './ModuleDetails.js'
import { TypedModuleSummary } from './TypedModuleSummary.js'

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
