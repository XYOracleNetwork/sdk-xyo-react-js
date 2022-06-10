import { WithChildren } from '@xylabs/react-shared'

const Web3ProviderIcon: React.FC<WithChildren> = ({ children }) => {
  const iconStyles = { marginRight: '14px', paddingTop: '8px', width: '32px' }
  return <span style={iconStyles}>{children}</span>
}

export { Web3ProviderIcon }
