import { Button, ButtonGroup, useTheme } from '@mui/material'
import { FlexCol, FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import cytoscape, { Core } from 'cytoscape'
import fcoseLayout from 'cytoscape-fcose'
import { forwardRef, useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../../../contexts'
import { NodeRelationalGraphProps } from '../../lib'

export const NodeRelationalGraphFlexBox = forwardRef<HTMLDivElement, NodeRelationalGraphProps>(
  ({ actions, children, showDetails, detail, spread, options, ...props }, ref) => {
    const theme = useTheme()
    const [cy, setCy] = useState<Core>()
    const { setCy: setCyContext } = useCytoscapeInstance()
    const sharedRef = useShareForwardedRef(ref)

    const handleReset = () => {
      cy?.reset()
      if (spread) {
        cy?.layout({ name: 'fcose', ...(typeof spread === 'object' ? spread : {}) }).run()
      }
      cy?.fit(undefined, 20)
    }

    useEffect(() => {
      if (sharedRef) {
        if (spread) {
          cytoscape.use(fcoseLayout)
        }
        const newCy = cytoscape({
          container: sharedRef.current,
          ...options,
        })
        if (spread) {
          newCy.layout({ name: 'fcose' }).run()
        }
        setCy(newCy)
      }
    }, [options, sharedRef, spread])

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
