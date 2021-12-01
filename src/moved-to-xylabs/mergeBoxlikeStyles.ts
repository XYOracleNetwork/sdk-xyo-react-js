/* eslint-disable @delagen/deprecation/deprecation */
import { Theme } from '@mui/material'

import BoxlikeComponentProps from './BoxlikeComponentProps'
import calcSpacing from './calcSpacing'

/** @deprecated Moved to @xylabs/sdk-react */
const mergeBoxlikeStyles = <T extends BoxlikeComponentProps>(
  theme: Theme,
  props: BoxlikeComponentProps,
  defaultProps?: BoxlikeComponentProps
): T => {
  const {
    alignContent,
    alignItems,
    alignSelf,
    bgcolor,
    border,
    borderColor,
    display,
    flexGrow,
    flexShrink,
    flexDirection,
    flexWrap,
    justifyContent,
    justifyItems,
    justifySelf,
    height,
    minHeight,
    minWidth,
    margin,
    marginX,
    marginY,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingLeft,
    paddingRight,
    paddingBottom,
    position,
    style,
    width,
    ...rootProps
  } = { ...defaultProps, ...props }
  const mergedStyle: React.CSSProperties = {
    alignContent,
    alignItems,
    alignSelf,
    backgroundColor: bgcolor,
    border,
    borderColor,
    display,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    height,
    justifyContent,
    justifyItems,
    justifySelf,
    marginBottom: calcSpacing(theme, [marginBottom, marginY, margin]),
    marginLeft: calcSpacing(theme, [marginLeft, marginX, margin]),
    marginRight: calcSpacing(theme, [marginRight, marginX, margin]),
    marginTop: calcSpacing(theme, [marginTop, marginY, margin]),
    minHeight,
    minWidth,
    paddingBottom: calcSpacing(theme, [paddingBottom, paddingY, padding]),
    paddingLeft: calcSpacing(theme, [paddingLeft, paddingX, padding]),
    paddingRight: calcSpacing(theme, [paddingRight, paddingX, padding]),
    paddingTop: calcSpacing(theme, [paddingTop, paddingY, padding]),
    position,
    width,
    ...style,
  }
  return {
    ...rootProps,
    style: mergedStyle,
  } as T
}

export default mergeBoxlikeStyles
