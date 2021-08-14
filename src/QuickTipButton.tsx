import { IconButton, IconButtonProps } from '@material-ui/core'
import { useState } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

import { MessageDialog } from './dialogs'

const QuickTipButton: React.FC<IconButtonProps> = ({ title, children, ...props }) => {
  const [messageOpen, setMessageOpen] = useState(false)

  return (
    <>
      <IconButton onClick={() => setMessageOpen(true)} size="small" {...props}>
        <AiOutlineQuestionCircle size={16} />
      </IconButton>
      <MessageDialog
        onOk={() => setMessageOpen(false)}
        onCancel={() => setMessageOpen(false)}
        onClose={() => setMessageOpen(false)}
        open={messageOpen}
        title={title ?? ''}
      >
        {children}
      </MessageDialog>
    </>
  )
}

export default QuickTipButton
