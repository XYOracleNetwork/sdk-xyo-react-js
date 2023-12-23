/** @description This is the width of all the cells (except the one passed) in the row combined and the spacing of the main cell */
export const getRemainingRowWidth = (row: HTMLElement, forCell = 0) => {
  let width = 0
  for (let i = 0; i < (row?.childElementCount ?? 0); i++) {
    const item = row?.children.item(i)
    if (item && i !== forCell) {
      width += item?.clientWidth ?? 0
    }
  }

  return width
}
