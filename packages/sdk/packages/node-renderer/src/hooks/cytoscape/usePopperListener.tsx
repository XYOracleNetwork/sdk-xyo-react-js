import { useTheme } from '@mui/material'
import { Core, NodeSingular } from 'cytoscape'
import { useCallback } from 'react'

export const usePopperListener = () => {
  const theme = useTheme()
  const shadowColor = theme.palette.getContrastText(theme.palette.text.primary)

  const popperListener = useCallback(
    (node: NodeSingular, hideLabels?: boolean, cy?: Core) => {
      const div = document.createElement('div')

      const popper = node.popper({
        content: () => {
          div.innerHTML = node.data().name
          div.style.opacity = '0'
          div.style.transition = 'opacity .25s'
          div.style.textShadow = `0 0 3px ${shadowColor}`

          document.body.appendChild(div)

          return div
        },
      })

      const update = () => {
        popper.update()
      }

      node.on('position', update)
      node.on('mouseover', () => (hideLabels ? (div.style.opacity = '1') : undefined))
      node.on('mouseout', () => (hideLabels ? (div.style.opacity = '0') : undefined))

      cy?.on('pan zoom resize', update)
    },
    [shadowColor],
  )

  return popperListener
}
