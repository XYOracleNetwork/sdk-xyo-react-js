import { Button } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module'
import { EventObject } from 'cytoscape'
import { useEffect } from 'react'

import { useCytoscapeInstance } from '../contexts'
import { useAddNewElements, useNewElements, usePopperListener, useRelationalGraphOptions } from '../hooks'
import { WithExtensions } from './cytoscape-extensions'
import { NodeRelationalGraphFlexBox } from './RelationalGraph'

export interface ModuleGraphFlexBoxProps extends FlexBoxProps {
  rootModule?: ModuleInstance | null
}

export const ModuleGraphFlexBox: React.FC<ModuleGraphFlexBoxProps> = ({ rootModule, ...props }) => {
  const { cy } = useCytoscapeInstance(true)
  const popperListener = usePopperListener()
  const { handleToggleLabels, hideLabels, options } = useRelationalGraphOptions(rootModule ?? undefined)

  const { newElements, setSelectedElement } = useNewElements()

  useAddNewElements(newElements, hideLabels)

  useEffect(() => {
    const listener = (event: EventObject) => {
      const element = event.target[0]
      if (element.isNode()) setSelectedElement(element)
    }
    cy?.on('select', listener)

    return () => {
      cy?.off('select', listener)
    }
  }, [cy, setSelectedElement])

  useEffect(() => {
    cy?.ready(() => {
      cy.nodes().forEach((node) => popperListener(node, hideLabels, cy))
    })
  }, [cy, hideLabels, popperListener, setSelectedElement])

  return (
    <WithExtensions>
      <NodeRelationalGraphFlexBox
        actions={
          <Button size={'small'} onClick={handleToggleLabels} variant="contained">
            Toggle Labels
          </Button>
        }
        options={options}
        {...props}
      />
    </WithExtensions>
  )
}
