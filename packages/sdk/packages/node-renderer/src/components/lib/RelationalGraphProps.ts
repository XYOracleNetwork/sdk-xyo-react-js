import { FlexBoxProps } from "@xylabs/react-flexbox"
import { CytoscapeOptions } from "cytoscape"
import { ReactNode } from "react"

export interface NodeRelationalGraphProps extends FlexBoxProps {
  actions?: ReactNode
  options?: CytoscapeOptions
}