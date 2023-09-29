import { Button, ButtonGroup, styled } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import cytoscape, { Core } from 'cytoscape'
import { forwardRef, useEffect, useState } from 'react'

import { useCytoscapeInstance } from '../contexts'
import { NodeRelationalGraphProps } from './lib'

export const NodeRelationalGraphFlexBox = forwardRef<HTMLDivElement, NodeRelationalGraphProps>(({ actions, children, options, ...props }, ref) => {
  const [cy, setCy] = useState<Core>()
  const { setCy: setCyContext } = useCytoscapeInstance()
  const sharedRef = useShareForwardedRef(ref)

  const handleReset = () => {
    cy?.reset()
    cy?.fit(undefined, 20)
  }

  useEffect(() => {
    if (sharedRef) {
      const newCy = cytoscape({
        container: sharedRef.current,
        ...options,
      })
      setCy(newCy)
    }
  }, [options, sharedRef])

  useEffect(() => {
    setCyContext?.(cy)
  }, [cy, setCyContext])

  return (
    <FlexCol {...props}>
      <ActionsContainer>
        <>
          {actions ? (
            <ButtonGroup>
              {actions}
              <Button size={'small'} variant={'contained'} onClick={handleReset}>
                Reset
              </Button>
            </ButtonGroup>
          ) : (
            <Button size={'small'} variant={'contained'} onClick={handleReset}>
              Reset
            </Button>
          )}
        </>
      </ActionsContainer>
      {/* Cytoscape Element */}
      <FlexCol alignItems="stretch" height="100%" position="absolute" ref={sharedRef} width="100%"></FlexCol>
      {children}
    </FlexCol>
  )
})

NodeRelationalGraphFlexBox.displayName = 'NodeRelationalGraph'

const ActionsContainer = styled(FlexRow, { name: 'ActionsContainer' })(({ theme }) => ({
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  position: 'absolute',
  right: '10px',
  top: '10px',
  zIndex: 2,
}))

/** @deprecated */
export const NodeRelationalGraph = NodeRelationalGraphFlexBox
