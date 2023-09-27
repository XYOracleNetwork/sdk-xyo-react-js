import { Button } from '@mui/material'
import { FlexBoxProps } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module'
import { EventObject } from 'cytoscape'
import { useEffect } from 'react'

import { useCytoscapeInstance } from '../contexts'
import { useNewElements, useNewOptions, useRelationalGraphOptions } from '../hooks'
import { WithExtensions } from './cytoscape-extensions'
import { NodeRelationalGraphFlexBox } from './RelationalGraph'

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

  useEffect(() => {
    cy?.ready(() => {
      cy.nodes().forEach((node) => {
        const popper = node.popper({
          content: () => {
            const div = document.createElement('div')

            div.innerHTML = 'Sticky Popper content'

            document.body.appendChild(div)

            return div
          },
        })

        const update = () => {
          popper.update()
        }

        node.on('position', update)

        cy.on('pan zoom resize', update)
      })
    })
  }, [cy, setSelectedElement])

  return (
    <WithExtensions>
      <NodeRelationalGraphFlexBox
        actions={
          <Button size={'small'} onClick={handleToggleLabels} variant="contained">
            Toggle Labels
          </Button>
        }
        options={newOptions}
        {...props}
      />
    </WithExtensions>
  )
}
