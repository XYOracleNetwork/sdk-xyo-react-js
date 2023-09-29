import { useTheme } from '@mui/material'
import { NodeSingular } from 'cytoscape'
import { Dispatch, SetStateAction } from 'react'

import { useCytoscapeInstance } from '../../contexts'
import { NodeBgStyles } from '../../Cytoscape'

export const useToggleSelectedElement = (setSelectedElement: Dispatch<SetStateAction<NodeSingular | undefined>>) => {
  const { cy } = useCytoscapeInstance(true)
  const theme = useTheme()

  const updateStyles = (element: NodeSingular, styles: [string, string]) => {
    cy
      ?.style()
      .selector(`node[id="${element.data().id}"]`)
      .style(...styles)
  }

  const toggleSelectedElement = (element: NodeSingular) => {
    setSelectedElement((previousSelectedElement) => {
      if (previousSelectedElement) {
        updateStyles(previousSelectedElement, NodeBgStyles(theme.palette.primary.main))
      }
      return element
    })
    updateStyles(element, NodeBgStyles(theme.palette.secondary.main))
  }

  return toggleSelectedElement
}
