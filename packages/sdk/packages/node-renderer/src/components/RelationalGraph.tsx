import { Button, styled } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import cytoscape, { Core, CytoscapeOptions } from 'cytoscape'
import { forwardRef, useEffect, useState } from 'react'

export interface NodeRelationalGraph extends FlexBoxProps {
  options?: CytoscapeOptions
}

export const NodeRelationalGraph = forwardRef<HTMLDivElement, NodeRelationalGraph>(({ options, ...props }, ref) => {
  const sharedRef = useShareForwardedRef(ref)
  const [cy, setCy] = useState<Core>()

  useEffect(() => {
    if (sharedRef) {
      setCy(
        cytoscape({
          container: sharedRef.current,
          ...options,
        }),
      )
    }
  }, [options, sharedRef])

  return (
    <FlexCol {...props}>
      <ResetButton size={'small'} variant={'contained'} onClick={() => cy?.reset()}>
        Reset
      </ResetButton>
      <FlexCol alignItems="stretch" height="100%" position="absolute" ref={sharedRef} width="100%"></FlexCol>
    </FlexCol>
  )
})

NodeRelationalGraph.displayName = 'NodeRelationalGraph'

const ResetButton = styled(Button, { name: 'ResetButton' })(() => ({
  position: 'absolute',
  right: '10px',
  top: '10px',
  zIndex: 2,
}))
