import { Drawer, DrawerProps, Paper, styled, Typography } from '@mui/material'
import { FlexCol } from '@xylabs/react-flexbox'
import React, { MouseEvent, PropsWithChildren, useMemo } from 'react'

export interface DrawerExProps extends PropsWithChildren<DrawerProps> {
  heightVariant?: 'full' | 'auto'
  subTitle?: string
  title?: string
  widthVariant?: 'full' | 'partial'
}

export const DrawerEx: React.FC<DrawerExProps> = ({
  children,
  heightVariant = 'full',
  subTitle,
  title,
  onClose,
  widthVariant = 'partial',
  ...props
}) => {
  const variantBasedProps = useMemo(() => {
    return {
      PaperProps: {
        sx: {
          alignItems: 'center',
          background: 'transparent',
          boxShadow: 'none',
          height: heightVariant === 'full' ? '100%' : 'auto',
          width: widthVariant === 'partial' ? 'auto' : '100%',
        },
      },
      onClick: (event: MouseEvent) => onClose?.(event, 'backdropClick'),
    }
  }, [heightVariant, onClose, widthVariant])

  return (
    <Drawer anchor="top" onClose={onClose} {...variantBasedProps} {...props}>
      {/* Trap the event to prevent triggering the backdrop onClick */}
      <StyledDrawerContentPaper
        widthVariant={widthVariant}
        elevation={16}
        onClick={event => event.stopPropagation()}
        sx={{ width: widthVariant === 'full' ? '100%' : undefined }}
      >
        {title || subTitle
          ? (
              <FlexCol alignItems="start" gap={1}>
                {title
                  ? <StyledEllipsisTypography variant="h3">{title}</StyledEllipsisTypography>
                  : null}
                {subTitle
                  ? (
                      <Typography variant="subtitle1" textTransform="none">
                        {subTitle}
                      </Typography>
                    )
                  : null}
              </FlexCol>
            )
          : null}
        {children}
      </StyledDrawerContentPaper>
    </Drawer>
  )
}

const StyledEllipsisTypography = styled(Typography, { name: 'StyledEllipsisTypography' })(() => ({
  maxWidth: '100%',
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

const StyledDrawerContentPaper = styled(Paper, {
  name: 'StyledDrawerContentPaper',
  shouldForwardProp: prop => !['widthVariant'].includes(prop as string),
})<DrawerExProps>(({ theme, widthVariant }) => ({
  alignItems: 'stretch',
  borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  height: '100%',
  maxWidth: '100%',
  overflowX: 'hidden',
  padding: theme.spacing(3),
  [theme.breakpoints.up('lg')]: {
    width: widthVariant === 'full' ? '100%' : '50%',
  },
  [theme.breakpoints.up('md')]: {
    width: widthVariant === 'full' ? '100%' : '75%',
  },
}))
