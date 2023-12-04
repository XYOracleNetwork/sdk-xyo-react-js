import { TableCellProps } from '@mui/material'

export interface ConnectedWalletTableCellProps {
  additionalAccounts?: string[]
  chainName?: string
  connected?: boolean
  currentAccount?: string[]
  icon?: string
  onConnect?: () => void
  onRevoke?: () => void
  tableCellProps?: TableCellProps
  totalAccounts: number
  walletName?: string
}
