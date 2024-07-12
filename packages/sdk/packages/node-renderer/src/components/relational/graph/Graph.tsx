import { Box, Button, ButtonGroup, Card, CardHeader, CardProps, Paper, useTheme } from '@mui/material'
import { Address, asAddress } from '@xylabs/hex'
import { FlexCol, FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { useWeakModuleFromNode } from '@xyo-network/react-node'
import cytoscape, { Core, NodeSingular } from 'cytoscape'
import cola from 'cytoscape-cola'
import coseBilkentLayout from 'cytoscape-cose-bilkent'
import dagre from 'cytoscape-dagre'
import eulerLayout from 'cytoscape-euler'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { NodeRelationalGraphProps } from '../../lib/index.js'

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
    case 'cola': {
      cytoscape.use(cola)
      break
    }
  }
}

type ModuleHoverDetailsProps = CardProps & {
  address: Address
  name: string
}

const ModuleHoverDetails: React.FC<ModuleHoverDetailsProps> = ({ name, address, ...props }) => {
  return (
    <Card elevation={3} {...props}>
      <CardHeader
        avatar={
          <Paper elevation={6} sx={{ bgcolor: '#fff', p: 1 }}>
            <Identicon value={address} size={24} />
          </Paper>
        }
        title={name}
        subheader={address}
      />
    </Card>
  )
}

export const NodeRelationalGraphFlexBox = forwardRef<HTMLDivElement, NodeRelationalGraphProps>(
  ({ actions, children, node, layout, layoutOptions, showDetails, detail, options, onHover, ...props }, ref) => {
    const theme = useTheme()
    const [cy, setCy] = useState<Core>()
    const cytoscapeRef = useRef<HTMLDivElement>()
    const [hoverPosition, setHoverBoundingBox] = useState<{ x1: number; x2: number; y1: number; y2: number }>()
    const [hoverAddress, setHoverAddress] = useState<Address>()

    const [moduleInstance] = useWeakModuleFromNode(hoverAddress, { node })

    useEffect(() => {
      cy?.on('mouseover tap', ({ target }) => {
        const cyNode = target as NodeSingular
        const bb = cyNode?.renderedBoundingBox?.()
        setHoverBoundingBox(bb)
        const id = cyNode.id?.()
        if (id) {
          if (id.includes('/')) {
            setHoverAddress(undefined)
            onHover?.()
          } else {
            setHoverAddress(asAddress(id))
            onHover?.(asAddress(id))
          }
        }
      })
    }, [onHover, cy])

    const handleReset = () => {
      cy?.reset()
      applyLayout(cy, layout ?? 'euler', layoutOptions)
    }

    useEffect(() => {
      let newCy: Core | undefined
      const container = cytoscapeRef.current
      if (container) {
        newCy = cytoscape({
          container,
          ...options,
        })
        setCy(newCy)
      }
      return () => {
        newCy?.destroy()
        setCy(undefined)
      }
    }, [options, cytoscapeRef, layoutOptions])

    useEffect(() => {
      if (cy) {
        loadLayout(layout)
        applyLayout(cy, layout ?? 'euler', layoutOptions)
      }
    }, [cy, layoutOptions, layout])

    return (
      <FlexCol id="relational-graph-wrapper" ref={ref} {...props}>
        {hoverAddress && hoverPosition ?
          <Box position="absolute" top={hoverPosition.y1} left={hoverPosition.x1} zIndex={100}>
            <ModuleHoverDetails address={hoverAddress} name={moduleInstance?.deref()?.id ?? 'Unknown'} />
          </Box>
        : null}
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
