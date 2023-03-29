import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import { WithChildren } from '@xylabs/react-shared'
import cytoscape, { Core, CytoscapeOptions } from 'cytoscape'
import { useEffect, useRef, useState } from 'react'

export interface NodeRelationalGraph extends WithChildren<FlexBoxProps> {
  options?: CytoscapeOptions
}

export const NodeRelationalGraph: React.FC<NodeRelationalGraph> = ({ children, options, ...props }) => {
  const graphRef = useRef<HTMLDivElement>(null)
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
  }, [])

  return (
    <FlexCol ref={graphRef} {...props}>
      {children}
    </FlexCol>
  )
}
