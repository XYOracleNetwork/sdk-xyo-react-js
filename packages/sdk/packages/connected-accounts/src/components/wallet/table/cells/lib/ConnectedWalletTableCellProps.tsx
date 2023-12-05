import { TableCellProps } from '@mui/material'

export interface ConnectedWalletTableCellProps {
  additionalAccounts?: string[]
  chainName?: string
  connected?: boolean
  currentAccount?: string[]
  icon?: string
  onConnect?: () => Promise<void>
  onRevoke?: () => void
  // Using a separate prop instead of extending the interface so we can safely pass all props to
  // the individual components and let them pick off the ones they want.
  tableCellProps?: TableCellProps
  totalAccounts: number
  walletName?: string
  walletRdns?: string
}
