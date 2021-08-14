import { IconButton, IconButtonProps } from '@material-ui/core'
import React, { MouseEvent, useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

import { MessageDialog } from './dialogs'

const QuickTipButton: React.FC<IconButtonProps> = ({ title, children, ...props }) => {
  const [messageOpen, setMessageOpen] = useState(false)

  const onClick = (event: MouseEvent) => {
    event.stopPropagation()
    setMessageOpen(true)
  }

  return (
    <IconButton onClick={onClick} size="small" {...props}>
      <AiOutlineQuestionCircle size={16} />
      {messageOpen ? (
        <MessageDialog
          onOk={() => setMessageOpen(false)}
          onCancel={() => setMessageOpen(false)}
          onClose={() => setMessageOpen(false)}
          open={messageOpen}
          title={title ?? ''}
        >
          {children}
        </MessageDialog>
      ) : null}
    </IconButton>
  )
}

export default QuickTipButton
