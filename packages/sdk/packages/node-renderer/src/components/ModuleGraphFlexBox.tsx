import { FlexBoxProps } from "@xylabs/react-flexbox";
import { ModuleInstance } from "@xyo-network/module";
import { EventObject } from "cytoscape";
import { useEffect } from "react";
import { useCytoscapeInstance } from "../contexts";
import { useRelationalGraphOptions } from "../hooks";
import { NodeRelationalGraphFlexBox } from "./RelationalGraph";

export interface ModuleGraphFlexBoxProps extends FlexBoxProps {
  rootModule?: ModuleInstance
}

export const ModuleGraphFlexBox: React.FC<ModuleGraphFlexBoxProps> = ({rootModule, ...props}) => {
  const options = useRelationalGraphOptions(rootModule)

  const { cy } = useCytoscapeInstance(true)

  useEffect(() => {
    const listener = (event: EventObject) => {
      const element = event.target[0]
      console.log(element.data().address)
    }
    if (cy) {
      cy.on('select', listener)
    }

    return () => {
      cy?.off('select', listener)
    }
  }, [cy])

  return <NodeRelationalGraphFlexBox options={options} {...props}/>
}