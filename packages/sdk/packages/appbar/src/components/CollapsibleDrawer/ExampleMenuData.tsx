import {
  VscAccount,
  VscGlobe,
  VscGraph,
  VscGraphLine,
  VscJson,
  VscServer,
  VscSettingsGear,
  VscSymbolMethod,
  VscSymbolNamespace,
} from 'react-icons/vsc'

import { SiteMenuListItemProps } from '../SiteMenu'

export const menuDataTop: SiteMenuListItemProps[] = [
  {
    icon: <VscGlobe />,
    primary: 'Explore',
    subNavListItems: [{ primary: 'Explore', to: '', tooltip: 'View global archivist data on a world map.' }],
    to: '',
    tooltip: 'View global archivist data on a world map.',
  },
  {
    icon: <VscSymbolMethod />,
    primary: 'Blocks',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscSymbolNamespace />,
    primary: 'Payloads',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscGraph />,
    primary: 'Queries',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscServer />,
    primary: 'Archives',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
]

export const menuDataBottom: SiteMenuListItemProps[] = [
  {
    icon: <VscGraphLine />,
    primary: 'Statistics',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscJson />,
    primary: 'Schema',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscAccount />,
    primary: 'Account',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscSettingsGear />,
    primary: 'Settings',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
]
