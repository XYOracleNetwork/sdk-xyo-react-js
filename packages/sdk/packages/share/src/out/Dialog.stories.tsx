import { Button, Typography } from '@mui/material'
import { Meta, StoryFn } from '@storybook/react'
import { FlexCol, FlexGrowCol, FlexRow } from '@xylabs/react-flexbox'
import React, { useMemo, useState } from 'react'

import { CopyLinkTextField } from './CopyLinkTextField.tsx'
import { GenerateShareLinkButton } from './GenerateShareLinkButton.tsx'
import { ShareOutHeadingFlexbox } from './HeadingFlexbox.tsx'
import { ShareOutDialog } from './ShareOutDialog.tsx'
import { SocialButtonsFlexbox } from './SocialButtonsFlexbox.tsx'

export default {
  title: 'modules/ShareOut/Dialog',
} as Meta<typeof ShareOutDialog>

const Template: StoryFn<typeof ShareOutDialog> = (props) => {
  return <ShareOutDialog {...props} />
}

const TemplateWithContent: StoryFn<typeof ShareOutDialog> = (props) => {
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const [shareUrl, setShareUrl] = useState('')
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { open: unused, ...restProps } = props

  const cardImg = 'https://picsum.photos/100/100'
  const shareLinkName = 'My Share Link'

  const generateLink = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(() => {
      setShareUrl('https://example.com')
      setLoading(false)
      resolve(null)
    }, 2000))
  }

  const shareOutDialogContent = useMemo(() => (
    <FlexGrowCol gap={2}>
      <ShareOutHeadingFlexbox shareLinkName={shareLinkName} shareUrl={shareUrl} />
      {shareUrl
        ? (
            <>
              <CopyLinkTextField shareLinkName={shareLinkName} shareUrl={shareUrl} />
              <SocialButtonsFlexbox shareUrl={shareUrl} />
            </>
          )
        : <GenerateShareLinkButton loading={loading} onClick={generateLink} />}
    </FlexGrowCol>
  ), [loading, generateLink, shareLinkName, shareUrl])

  const shareOutDialogActions = ({ onClose }: { onClose?: () => void }) => <Button onClick={onClose} variant="outlined">Cancel</Button>

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="contained">Open</Button>
      <ShareOutDialog cardImg={cardImg} onClose={onClose} ShareOutDialogActions={shareOutDialogActions} shareOutDialogContent={shareOutDialogContent} open={open} title="Share Out Dialog" subtitle="With a subtitle" {...restProps} />
    </>
  )
}

const Default = Template.bind({})

const WithContent = TemplateWithContent.bind({})
WithContent.args = {}

export { Default, WithContent }
