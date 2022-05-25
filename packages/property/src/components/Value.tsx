import { Typography, TypographyProps, useTheme } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { useEffect, useRef, useState } from 'react'

export interface PropertyValueProps extends TypographyProps<'div'> {
  value?: string | number | boolean | null
  typographyVariant?: Variant
  /** @field The space that is removed from the ... at end (mainly for identicon) */
  shortSpace?: number
}

export const PropertyValue: React.FC<PropertyValueProps> = ({ value, shortSpace, typographyVariant = 'body1', ...props }) => {
  const [parentWidth, setParentWidth] = useState<number>()
  const theme = useTheme()

  const ref = useRef<HTMLDivElement>(null)

  const customThemeProps = {
    clamped: parentWidth && theme ? parentWidth - parseInt(theme.spacing(2), 10) - (shortSpace ?? 0) : undefined,
    title: value?.toString(),
  }

  useEffect(() => {
    const resizeHandler = () => {
      const smallestWidth = getSmallestParentWidth(ref.current)
      setParentWidth(smallestWidth)
    }

    const getSmallestParentWidth = (element: HTMLElement | null) => {
      let current = element?.parentElement
      let width: number | null = null
      while (current) {
        if (width === null || current.clientWidth < width) {
          width = current.clientWidth
        }
        current = current.parentElement
      }
      return width ?? undefined
    }

    window.addEventListener('resize', resizeHandler)

    setParentWidth(getSmallestParentWidth(ref.current))

    return () => {
      window?.removeEventListener('resize', resizeHandler)
    }
  }, [])

  return value !== undefined ? (
    <Typography minWidth={0} ref={ref} component="div" variant={typographyVariant} fontFamily="monospace" fontWeight="light" {...customThemeProps} {...props}>
      {value}
    </Typography>
  ) : null
}
