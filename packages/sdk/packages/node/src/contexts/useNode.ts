import { XyoNode } from '@xyo-network/node'
import { useContextEx } from '@xyo-network/react-shared'
import { Dispatch } from 'react'

import { XyoNodeContext } from './Context'

export const useNode = (): [XyoNode | undefined, Dispatch<XyoNode> | undefined] => {
  const { node, setNode } = useContextEx(XyoNodeContext, 'XyoNode')

  return [node, setNode]
}
