import { useMemo } from 'react'

import { useCollapsible } from '../../../contexts'
import { MenuListItemProps } from '../MenuListItem'

export type DefaultSiteMenuListItemProps = Pick<MenuListItemProps, 'collapseEnd' | 'dense' | 'iconOnly' | 'sx'>

export const useMenuItemsShared = () => {
  const { collapse, collapseEnd, setCollapse, setCollapseEnd } = useCollapsible()

  const onMenuItemToggle = (open?: boolean) => {
    setCollapse?.((previous) => (open ? false : previous))
    setCollapseEnd?.((previous) => (open ? false : previous))
  }

  const defaultSiteMenuListItemProps: DefaultSiteMenuListItemProps = useMemo(
    () => ({
      collapseEnd,
      dense: true,
      iconOnly: collapse,
      sx: {
        px: '8px',
      },
    }),
    [collapse, collapseEnd],
  )

  return { defaultSiteMenuListItemProps, onMenuItemToggle }
}
