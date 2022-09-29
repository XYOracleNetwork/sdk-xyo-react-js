import { Box, BoxProps, styled } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'

/**
 * Heavily inspired by - https://stackoverflow.com/a/30362531/2803259
 */

const ComponentName = 'Ellipsize'

const EllipsizeRoot = styled(Box, {
  name: ComponentName,
  slot: 'Root',
})(() => ({
  '&': {
    // because the cell content ends up absolutely positioned, the cell doesn't know the content height.
    // the pseudo element with a hidden character establishes the proper height of the content and hides it
    ':before': {
      content: "'nbsp;'",
      display: 'block',
      // take the pseudo element out of the `display: block` flow so it won't push against our actual content
      float: 'left',
      visibility: 'hidden',
    },
  },
}))

const EllipsizeInnerWrap = styled(Box, {
  name: ComponentName,
  slot: 'innerWrap',
})(() => ({
  position: 'relative',
}))

const EllipsizeContentWrap = styled('span', {
  name: ComponentName,
  slot: 'contentWrap',
})(() => ({
  fontFamily: 'monospace',
  left: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export const Ellipsize: React.FC<WithChildren<BoxProps>> = ({ children, ...props }) => {
  return (
    <EllipsizeRoot {...props}>
      <EllipsizeInnerWrap>
        <EllipsizeContentWrap>{children}</EllipsizeContentWrap>
      </EllipsizeInnerWrap>
    </EllipsizeRoot>
  )
}
