import { ArrowForwardRounded } from '@mui/icons-material'
import { Avatar, Backdrop, Box, Fade, IconButton, Modal, Typography } from '@mui/material'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import * as React from 'react'

const style = {
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  width: 400,
}

export const StatsModal: React.FC = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <IconButton size="small" color="primary" onClick={handleOpen}>
        <ArrowForwardRounded />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <FlexGrowCol alignItems="center">
              <Avatar sx={{ height: '200px', width: '200px' }}></Avatar>
              <Typography id="transition-modal-description" align="center" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </FlexGrowCol>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
