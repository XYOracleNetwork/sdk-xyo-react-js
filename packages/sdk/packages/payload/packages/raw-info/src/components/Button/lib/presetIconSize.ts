import type { IconSize } from './IconSize.ts'

export const presetIconSizeValue = (size?: IconSize) => {
  switch (size) {
    case 'small': {
      return 16
    }
    case 'medium': {
      return 32
    }
    case 'large': {
      return 48
    }
  }
}
