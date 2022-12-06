import { Link } from '@mui/material'
import { QuickTipButton, QuickTipButtonProps } from '@xylabs/react-quick-tip-button'
import { TypographyEx } from '@xyo-network/react-shared'

export type DescriptionQuickTipProps = QuickTipButtonProps

export const DescriptionQuickTip: React.FC<DescriptionQuickTipProps> = ({ ...props }) => (
  <QuickTipButton hoverText="More Info" {...props}>
    <TypographyEx>
      Ethereum gas price estimates derived by combining pricing from Blocknative, Etherchain, Ethers, and Etherscan. Learn more about recent changes
      to gas fees on Ethereum{' '}
      <Link href="https://www.blocknative.com/blog/eip-1559-fees" target="_blank" rel="nofollow">
        here.
      </Link>
    </TypographyEx>
  </QuickTipButton>
)
