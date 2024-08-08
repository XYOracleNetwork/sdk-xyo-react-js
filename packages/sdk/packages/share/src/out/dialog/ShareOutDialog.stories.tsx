import { Button, Typography } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import React, { useMemo, useState } from 'react'

import { ShareOutDialog } from './ShareOutDialog.tsx'

export default {
  title: 'modules/ShareOut/Dialog',
} as Meta<typeof ShareOutDialog>

const Template: StoryFn<typeof ShareOutDialog> = (props) => {
  return <ShareOutDialog {...props} />
}

const TemplateWithContent: StoryFn<typeof ShareOutDialog> = (props) => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { open: unused, ...restProps } = props

  const cardImg = 'https://picsum.photos/100/100'

  const shareOutDialogContent = useMemo(() => <Typography>Share Out DialogContent</Typography>, [])
  const shareOutDialogActions = ({ onClose }: { onClose?: () => void }) => <Button onClick={onClose} variant="outlined">Cancel</Button>

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">Open</Button>
      <ShareOutDialog cardImg={cardImg} onClose={onClose} ShareOutDialogActions={shareOutDialogActions} shareOutDialogContent={shareOutDialogContent} open={open} title="Share Out Dialog" subtitle="With a subtitle" {...restProps} />
    </>
  )
}

const Default = Template.bind({})
Default.args = {
  open: true,
}

const WithContent = TemplateWithContent.bind({})
WithContent.args = {}

export { Default, WithContent }
