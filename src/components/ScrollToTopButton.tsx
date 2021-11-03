import { Box, useScrollTrigger, useTheme, Zoom, ZoomProps } from '@mui/material'
import React from 'react'

interface ScrollToTopButtonProps extends ZoomProps {
  anchorId: string
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ children, anchorId, ...props }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(`#${anchorId}`)

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const theme = useTheme()

  return (
    <Zoom in={trigger} {...props}>
      <Box
        zIndex={10}
        position="fixed"
        right={theme.spacing(2)}
        bottom={theme.spacing(2)}
        onClick={handleClick}
        role="presentation"
      >
        {children}
      </Box>
    </Zoom>
  )
}

export default ScrollToTopButton
