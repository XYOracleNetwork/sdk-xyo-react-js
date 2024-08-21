import { styled } from '@mui/material'

import { SystemControlsType } from './SystemControlsType.ts'
import type { SystemControlsUnstyledProps } from './SystemControlsUnstyled.tsx'
import { SystemControlsUnstyled } from './SystemControlsUnstyled.tsx'

const SystemControlsRoot = styled(SystemControlsUnstyled, {
  name: 'SystemControls', slot: 'Root',
})<SystemControlsUnstyledProps>(({ theme }) => ({
  // shared defaults
  ['&']: {
    '.toggle': {
      backgroundColor: theme.palette.primary.main,
    },
    'alignItems': 'start',
    'zIndex': 1,
  },
  // WindowShade System Controls styles
  [`&.system-controls-type-${SystemControlsType.WindowShade}`]: {
    '.control': {
      borderRadius: '0 0 5px 5px',
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'space-around',
      padding: `${theme.spacing(2)} ${theme.spacing(2.5)}`,
    },
    '.controls': {
      alignItems: 'stretch',
      flexDirection: 'column',
      flexGrow: 1,
    },
    '.toggle': {
      borderRadius: '0 0 5px 5px',
      padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
    },
    'flexDirection': 'row',
    'position': 'absolute',
    'top': 0,
    'width': '100%',
  },
  // Left System Control styles
  [`&.system-controls-type-${SystemControlsType.Left}`]: {
    '.control': {
      alignItems: 'start',
      flexDirection: 'column',
      padding: `${theme.spacing(2)} ${theme.spacing(2.5)}`,
    },
    '.control-wrap': {
      marginBottom: `${theme.spacing(2)}`,
    },
    '.toggle': {
      borderRadius: '0 5px 5px 0',
      padding: `${theme.spacing(1)} ${theme.spacing(0.5)}`,
      writingMode: 'vertical-rl',
    },
    'flexDirection': 'column',
    'left': 0,
    'position': 'fixed',
    'top': '30vh',
    'width': 'auto',
  },
}))

export { SystemControlsRoot }
