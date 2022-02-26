export const getRemainingRowWidth = (row: HTMLElement, forCell = 0) => {
  let width = 0
  let padding = 0
  for (let i = 0; i < (row?.childElementCount ?? 0); i++) {
    const item = row?.children.item(i)
    if (item) {
      if (i !== forCell) {
        width += item?.clientWidth ?? 0
      }
      padding += parseInt(
        window.getComputedStyle(item, null)?.getPropertyValue('padding-left').replaceAll('px', '') ?? 0
      )
      padding += parseInt(
        window.getComputedStyle(item, null)?.getPropertyValue('padding-right').replaceAll('px', '') ?? 0
      )
    }
  }

  return width + padding
}
