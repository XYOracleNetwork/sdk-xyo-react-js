import { Button, ButtonGroup, useTheme } from '@mui/material'
import { FlexCol, FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import cytoscape, { Core } from 'cytoscape'
import cola from 'cytoscape-cola'
import dagre from 'cytoscape-dagre'
import fcose from 'cytoscape-fcose'
import { forwardRef, useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../../contexts'
import { NodeRelationalGraphProps } from '../../lib'

export const NodeRelationalGraphFlexBox = forwardRef<HTMLDivElement, NodeRelationalGraphProps>(
  ({ actions, children, directed, forceDirected, showDetails, detail, spread, options, ...props }, ref) => {
    const theme = useTheme()
    const [cy, setCy] = useState<Core>()
    const { setCy: setCyContext } = useCytoscapeInstance()
    const sharedRef = useShareForwardedRef(ref)

    const handleReset = () => {
      cy?.reset()
      if (directed) {
        cy?.layout({ name: 'dagre', ...(typeof directed === 'object' ? directed : {}) }).run()
      }
      if (spread) {
        cy?.layout({ name: 'fcose', ...(typeof spread === 'object' ? spread : {}) }).run()
      }
      if (forceDirected) {
        cy?.layout({ name: 'cola', ...(typeof forceDirected === 'object' ? forceDirected : {}) }).run()
      }
      cy?.fit(undefined, 20)
    }

    useEffect(() => {
      if (sharedRef) {
        if (directed) {
          cytoscape.use(dagre)
        }
        if (spread) {
          cytoscape.use(fcose)
        }
        if (forceDirected) {
          cytoscape.use(cola)
        }
        const newCy = cytoscape({
          container: sharedRef.current,
          ...options,
        })
        if (directed) {
          newCy.layout({ name: 'dagre', ...(typeof directed === 'object' ? directed : {}) }).run()
        }
        if (spread) {
          newCy.layout({ name: 'fcose', ...(typeof spread === 'object' ? spread : {}) }).run()
        }
        if (forceDirected) {
          newCy?.layout({ name: 'cola', ...(typeof forceDirected === 'object' ? forceDirected : {}) }).run()
        }
        newCy.fit(undefined, 20)
        setCy(newCy)
      }
    }, [options, sharedRef, spread, directed, forceDirected])

    useEffect(() => {
      setCyContext?.(cy)
    }, [cy, setCyContext])

    return (
      <FlexCol id="relational-graph-wrapper" {...props}>
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
            <FlexCol alignItems="stretch" position="absolute" width="100%" height="100%" ref={sharedRef} />
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
