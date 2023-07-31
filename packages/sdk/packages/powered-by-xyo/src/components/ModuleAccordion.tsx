import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ModuleInstance } from '@xyo-network/module-model'

export interface ModuleAccordionProps<T extends ModuleInstance = ModuleInstance> extends Omit<AccordionProps, 'children'> {
  module?: T
}

import { Accordion, AccordionDetails, AccordionProps, AccordionSummary } from '@mui/material'

import { ModuleDetails } from './ModuleDetails'
import { TypedModuleSummary } from './TypedModuleSummary'

export const ModuleAccordion: React.FC<ModuleAccordionProps> = ({ module, ...props }) => {
  return (
    <Accordion {...props}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <TypedModuleSummary module={module} />
      </AccordionSummary>
      <AccordionDetails>
        <ModuleDetails module={module} />
      </AccordionDetails>
    </Accordion>
  )
}
