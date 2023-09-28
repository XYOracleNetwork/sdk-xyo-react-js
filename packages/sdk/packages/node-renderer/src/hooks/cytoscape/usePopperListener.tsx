import { Typography } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { Core, NodeSingular } from 'cytoscape'
import { flushSync } from 'react-dom'
// eslint-disable-next-line import/no-internal-modules
import { createRoot } from 'react-dom/client'

export const usePopperListener = () => {
  const popperListener = (node: NodeSingular, hideLabels?: boolean, cy?: Core) => {
    const div = document.createElement('div')

    const { address, name } = node.data()

    const popper = node.popper({
      content: () => {
        div.style.display = 'none'

        const root = createRoot(div)
        flushSync(() => {
          root.render(
            <FlexRow paper p={2} gap={2}>
              <Identicon value={address} size={24} />
              <Typography>{name}</Typography>
            </FlexRow>,
          )
        })

        document.body.appendChild(div)

        return div
      },
      popper: { modifiers: [], placement: 'top', strategy: 'absolute' },
    })

    const update = async () => {
      await popper.update()
    }

    node.on('position', update)
    node.on('mouseover tap', () => {
      div.style.display = 'block'
      div.style.cursor = 'pointer'
    })
    node.on('mouseout', () => {
      div.style.display = 'none'
    })

    cy?.on('pan zoom resize', update)
  }

  return popperListener
}
