import { XyoBoundWitness } from '@xyo-network/boundwitness'
import { CardContentEx, CardContentExProps } from '@xyo-network/react-card'
import { useTableHeight } from '@xyo-network/react-table'

import { BoundWitnessPayloadsTable, BoundWitnessPayloadsTableForBWs, BoundWitnessSignatureTable } from '../../_shared'

const noOpFooterProp = { PayloadTableFooterComponent: () => <></> }

export interface ExpandedCardContentProps extends CardContentExProps {
  activeTab?: number
  boundwitness?: XyoBoundWitness
}

export const ExpandedCardContent: React.FC<ExpandedCardContentProps> = ({ activeTab, boundwitness }) => {
  const { height } = useTableHeight()
  return (
    <CardContentEx removePadding variant="scrollable" sx={{ height: height !== undefined ? height : 'auto' }}>
      {activeTab === 0 ? <BoundWitnessPayloadsTable boundwitness={boundwitness} {...noOpFooterProp} /> : null}
      {activeTab === 1 ? <BoundWitnessPayloadsTableForBWs boundwitness={boundwitness} {...noOpFooterProp} /> : null}
      {activeTab === 2 ? <BoundWitnessSignatureTable block={boundwitness} stickyHeader /> : null}
    </CardContentEx>
  )
}
