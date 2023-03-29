import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import cytoscape, { Core, CytoscapeOptions } from 'cytoscape'
import { forwardRef, useEffect, useState } from 'react'

export interface NodeRelationalGraph extends WithChildren<FlexBoxProps> {
  options?: CytoscapeOptions
}

export const NodeRelationalGraph = forwardRef<HTMLDivElement, NodeRelationalGraph>(({ children, options, ...props }, ref) => {
  const sharedRef = useShareForwardedRef(ref)
  // TODO - likely a value to stick in context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <FlexCol ref={sharedRef} {...props}>
      {children}
    </FlexCol>
  )
})

NodeRelationalGraph.displayName = 'NodeRelationalGraph'
