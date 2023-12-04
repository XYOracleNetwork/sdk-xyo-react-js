import { TableHeadCell } from '@xyo-network/react-table'

export const WalletsTableHeadCells: TableHeadCell[] = [
  {
    disablePadding: false,
    id: 'wallet',
    label: 'Wallet',
    numeric: false,
    showOnMobile: true,
  },
  {
    disablePadding: false,
    id: 'chain',
    label: 'Chain',
    numeric: false,
    showOnMobile: true,
  },
  {
    disablePadding: false,
    id: 'accounts',
    label: 'Accounts',
    numeric: true,
    showOnMobile: true,
  },
  {
    disablePadding: false,
    id: 'actions',
    label: 'Actions',
    numeric: false,
    showOnMobile: true,
  },
  {
    disablePadding: false,
    id: 'enabled',
    label: 'Enabled',
    numeric: false,
    showOnMobile: true,
  },
]
