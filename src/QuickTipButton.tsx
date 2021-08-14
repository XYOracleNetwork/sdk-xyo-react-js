import { IconButton, IconButtonProps, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

import { MessageDialog } from './dialogs'

const QuickTipButton: React.FC<IconButtonProps> = (props) => {
  const { title, children } = props

  const [messageOpen, setMessageOpen] = useState(false)

  return (
    <IconButton onClick={() => setMessageOpen(true)} size="small">
      <AiOutlineQuestionCircle size={16} />
      <MessageDialog onClose={() => setMessageOpen(false)} open={messageOpen} title={title ?? ''}>
        <Typography variant="body1">{children}</Typography>
      </MessageDialog>
    </IconButton>
  )
}

export default QuickTipButton
