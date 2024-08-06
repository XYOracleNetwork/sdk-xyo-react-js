import { HelpOutline as HelpOutlineIcon } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  IconButtonProps,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

export const SeedPhraseIconButton: React.FC<IconButtonProps> = (props) => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  return (
    <>
      <IconButton onClick={() => setOpen(true)} {...props}>
        <HelpOutlineIcon fontSize="small" />
      </IconButton>
      <Dialog open={open}>
        <DialogTitle>Understanding your Seed Phrase</DialogTitle>
        <DialogContent>
          <Typography>
            Your Seed Phrase should adhere to the
            {' '}
            <Link target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki">
              bip39 specification
            </Link>
            {' '}
            and is used to generate accounts which identify your data on the XYO Network.
          </Typography>
          <List>
            <ListItem>Do not share this phrase with anyone.</ListItem>
            <ListItem>Do not save it to a public computer.</ListItem>
            <ListItem>Do not use a existing phrase from another wallet (i.e. Metamask).</ListItem>
            <ListItem>Do not use before copying it down somewhere safe.</ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="outlined">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
