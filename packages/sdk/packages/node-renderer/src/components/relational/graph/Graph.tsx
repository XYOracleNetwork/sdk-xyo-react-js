import { Button, ButtonGroup, useTheme } from '@mui/material'
import { FlexCol, FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import cytoscape, { Core } from 'cytoscape'
import cola from 'cytoscape-cola'
import coseBilkentLayout from 'cytoscape-cose-bilkent'
import dagre from 'cytoscape-dagre'
import eulerLayout from 'cytoscape-euler'
import fcose from 'cytoscape-fcose'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { NodeRelationalGraphProps } from '../../lib'

const applyLayout = (cy?: cytoscape.Core, name = 'cola', options?: object) => {
  cy?.layout({ name, ...options }).run()
}

const loadLayout = (layout = 'cola') => {
  switch (layout) {
    case 'dagre': {
      cytoscape.use(dagre)
      break
    }
    case 'euler': {
      cytoscape.use(eulerLayout)
      break
    }
    case 'cose-bilkent': {
      cytoscape.use(coseBilkentLayout)
      break
    }
    case 'fcose': {
      cytoscape.use(fcose)
      break
    }
    case 'cola': {
      cytoscape.use(cola)
      break
    }
  }
}

export const NodeRelationalGraphFlexBox = forwardRef<HTMLDivElement, NodeRelationalGraphProps>(
  ({ actions, children, layout, layoutOptions, showDetails, detail, options, ...props }, ref) => {
    const theme = useTheme()
    const [cy, setCy] = useState<Core>()
    const cytoscapeRef = useRef<HTMLDivElement>()

    const handleReset = () => {
      cy?.reset()
      applyLayout(cy, layout ?? 'euler', layoutOptions)
    }

    useEffect(() => {
      let newCy: Core | undefined
      const container = cytoscapeRef.current
      if (container) {
        loadLayout(layout)
        newCy = cytoscape({
          container,
          ...options,
        })
        applyLayout(newCy, layout ?? 'euler', layoutOptions)
        setCy(newCy)
      }
      return () => {
        newCy?.destroy()
        setCy(undefined)
      }
    }, [options, cytoscapeRef, layoutOptions, layout])

    return (
      <FlexCol id="relational-graph-wrapper" ref={ref} {...props}>
        <FlexRow justifyContent="start" width="100%">
          {actions === null ?
            null
          : actions ?
            <ButtonGroup>
              {actions}
              <Button size={'small'} variant={'contained'} onClick={handleReset}>
                Reset View
              </Button>
            </ButtonGroup>
          : <Button size={'small'} variant={'contained'} onClick={handleReset}>
              Reset
            </Button>
          }
        </FlexRow>
        <FlexGrowRow width="100%" alignItems="start">
          {showDetails ?
            <FlexCol height="100%" width={'85%'}>
              {detail}
            </FlexCol>
          : null}
          <FlexCol
            justifyContent="start"
            classes="cytoscape-wrap"
            width={showDetails ? '15%' : '100%'}
            height={showDetails ? '50%' : '100%'}
            border={showDetails ? `1px solid ${theme.palette.divider}` : undefined}
          >
            {/* Cytoscape Element */}
            <FlexCol alignItems="stretch" position="absolute" width="100%" height="100%" ref={cytoscapeRef} />
            {children}
          </FlexCol>
        </FlexGrowRow>
      </FlexCol>
    )
  },
)

NodeRelationalGraphFlexBox.displayName = 'NodeRelationalGraph'

/** @deprecated */
export const NodeRelationalGraph = NodeRelationalGraphFlexBox
