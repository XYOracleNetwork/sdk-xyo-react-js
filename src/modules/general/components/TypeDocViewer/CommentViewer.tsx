import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/sdk-react'
import { Comment } from 'typedoc'

export interface CommentViewerProps extends FlexBoxProps {
  comment: Comment
}

export const CommentViewer: React.FC<CommentViewerProps> = ({ comment, ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Typography variant="body2">{comment.text ?? comment.shortText}</Typography>
    </FlexCol>
  )
}
