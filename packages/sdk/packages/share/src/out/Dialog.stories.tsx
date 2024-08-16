import { Button } from '@mui/material'
import type { Meta, StoryFn } from '@storybook/react'
import { FlexGrowCol } from '@xylabs/react-flexbox'
import React, { useMemo, useState } from 'react'

import { CopyLinkTextField } from './CopyLinkTextField.tsx'
import { ShareOutDialog } from './Dialog.tsx'
import { ShareOutExplanation } from './Explanation.tsx'
import { GenerateShareLinkButton } from './GenerateShareLinkButton.tsx'
import { ShareOutHeadingFlexbox } from './HeadingFlexbox.tsx'
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

  const cardImg = <img src="https://picsum.photos/100/100" height="100px" width="100px" />
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
      <ShareOutExplanation />
    </FlexGrowCol>
  ), [loading, generateLink, shareLinkName, shareUrl])

  const shareOutDialogActions = ({ onClose }: { onClose?: () => void }) => <Button onClick={onClose} variant="outlined">Close</Button>

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
