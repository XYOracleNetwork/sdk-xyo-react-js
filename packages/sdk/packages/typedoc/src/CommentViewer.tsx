import { Typography } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'
import type { Comment } from 'typedoc'

export interface CommentViewerProps extends FlexBoxProps {
  comment: Comment
}

export const CommentViewer: React.FC<CommentViewerProps> = ({ comment, ...props }) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Typography variant="body2">{comment.summary[0]?.text}</Typography>
    </FlexCol>
  )
}
