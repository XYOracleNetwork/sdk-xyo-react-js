import {
  VscAccount,
  VscAdd,
  VscDashboard,
  VscGlobe,
  VscGraph,
  VscGraphLine,
  VscJson,
  VscServer,
  VscSettingsGear,
  VscSymbolMethod,
  VscSymbolNamespace,
  VscTable,
  // eslint-disable-next-line import/no-internal-modules
} from 'react-icons/vsc/index.js'

import { MenuListItemProps } from '../SiteMenu'

export const menuDataTop: MenuListItemProps[] = [
  {
    icon: <VscGlobe fontSize="body1" />,
    primary: 'Explore',
    to: '',
    tooltip: 'View global archivist data on a world map.',
  },
  {
    icon: <VscSymbolMethod fontSize="body1" />,
    primary: 'Blocks',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscSymbolNamespace fontSize="body1" />,
    primary: 'Payloads',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscGraph fontSize="body1" />,
    primary: 'Queries',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscServer fontSize="body1" />,
    primary: 'Archives',
    subNavListItems: [
      { icon: <VscDashboard fontSize="body2" />, primary: 'Dashboard', to: '', tooltip: 'View data for all archives on this network.' },
      { icon: <VscAdd fontSize="body2" />, primary: 'Create Archive', to: '', tooltip: 'Create a new archive on this network.' },
      { icon: <VscTable fontSize="body2" />, primary: 'Archive Table', to: '', tooltip: 'View all archives on this network as a table.' },
    ],
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
]

export const menuDataBottom: MenuListItemProps[] = [
  {
    icon: <VscGraphLine fontSize="body1" />,
    primary: 'Statistics',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscJson fontSize="body1" />,
    primary: 'Schema',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscAccount fontSize="body1" />,
    primary: 'Account',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
  {
    icon: <VscSettingsGear fontSize="body1" />,
    primary: 'Settings',
    to: '',
    tooltip: 'The most recent blocks seen in the in temp archive on your current network.',
  },
]
