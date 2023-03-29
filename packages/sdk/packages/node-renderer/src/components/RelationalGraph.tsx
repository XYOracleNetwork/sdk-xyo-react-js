import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import cytoscape, { Core, CytoscapeOptions } from 'cytoscape'
import { forwardRef, useEffect, useRef, useState } from 'react'

export interface NodeRelationalGraph extends WithChildren<FlexBoxProps> {
  options?: CytoscapeOptions
}

export const NodeRelationalGraph = forwardRef<HTMLDivElement, NodeRelationalGraph>(({ children, options, ...props }, ref) => {
  const graphRef = useRef<HTMLDivElement>(null)
  const sharedRef = useShareForwardedRef(graphRef)
  const [cy, setCy] = useState<Core>()

  useEffect(() => {
    if (graphRef) {
      setCy(
        cytoscape({
          container: graphRef.current,
          ...options,
        }),
      )
    }
  }, [options])

  return (
    <FlexCol ref={sharedRef} {...props}>
      {children}
    </FlexCol>
  )
})

NodeRelationalGraph.displayName = 'NodeRelationalGraph'
