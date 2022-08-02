import { FlexBoxProps } from '@xylabs/react-flexbox'
import { XyoPayloadDetailsRenderProps } from '@xyo-network/react-payload-plugin'

import { UniswapPairsCardView } from './Cards'
import { UniswapPairsTableView } from './Table'

export const UniswapDetailsRender: React.FC<XyoPayloadDetailsRenderProps & FlexBoxProps> = ({ listMode, ...props }) => {
  if (listMode === 'table') {
    return <UniswapPairsTableView {...props} />
  } else {
    return <UniswapPairsCardView {...props} />
  }
}
