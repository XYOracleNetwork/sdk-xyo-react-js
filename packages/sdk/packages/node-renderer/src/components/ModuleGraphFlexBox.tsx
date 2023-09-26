import { Button } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module'
import { EventObject } from 'cytoscape'
import { useEffect } from 'react'

import { useCytoscapeInstance } from '../contexts'
import { useNewElements, useNewOptions, useRelationalGraphOptions } from '../hooks'
import { NodeRelationalGraphFlexBox } from './RelationalGraph'
import { WithCola } from './WithCola'

export interface ModuleGraphFlexBoxProps extends FlexBoxProps {
  rootModule?: ModuleInstance | null
}

export const ModuleGraphFlexBox: React.FC<ModuleGraphFlexBoxProps> = ({ rootModule, ...props }) => {
  const { cy } = useCytoscapeInstance(true)
  const { handleToggleLabels, options } = useRelationalGraphOptions(rootModule ?? undefined)

  const { newElements, setSelectedElement } = useNewElements()

  const newOptions = useNewOptions(options, newElements)

  useEffect(() => {
    const listener = (event: EventObject) => {
      const element = event.target[0]
      if (element.isNode()) setSelectedElement(element)
    }
    if (cy) {
      cy.on('select', listener)
    }

    return () => {
      cy?.off('select', listener)
    }
  }, [cy, setSelectedElement])

  return (
    <WithCola>
      <NodeRelationalGraphFlexBox
        actions={
          <Button size={'small'} onClick={handleToggleLabels} variant="contained">
            Toggle Labels
          </Button>
        }
        options={newOptions}
        {...props}
      />
    </WithCola>
  )
}
