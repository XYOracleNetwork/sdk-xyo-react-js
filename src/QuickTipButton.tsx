import { IconButton, Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

import { MessageDialog } from './dialogs'

interface QuickTipButtonProps {
  children: ReactElement | ReactElement[] | string
  title: string
}

const QuickTipButton: React.FC<QuickTipButtonProps> = (props) => {
  const { title, children } = props

  const [messageOpen, setMessageOpen] = useState(false)

  return (
    <IconButton onClick={() => setMessageOpen(true)} size="small">
      <AiOutlineQuestionCircle size={16} />
      <MessageDialog onClose={() => setMessageOpen(false)} open={messageOpen} title={title}>
        <Typography variant="body1">{children}</Typography>
      </MessageDialog>
    </IconButton>
  )
}

export default QuickTipButton
