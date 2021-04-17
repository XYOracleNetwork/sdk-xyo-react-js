import React from 'react'

import { PaperBox, PaperBoxProps } from './PaperBox'

const FlexPaper: React.FC<PaperBoxProps> = (props) => {
  return <PaperBox display="flex" {...props} />
}

const FlexPaperCol: React.FC<PaperBoxProps> = (props) => {
  return <PaperBox display="flex" flexDirection="column" {...props} />
}

const FlexGrowPaper: React.FC<PaperBoxProps> = (props) => {
  return <FlexPaper flexGrow={1} {...props} />
}

const FlexGrowPaperCol: React.FC<PaperBoxProps> = (props) => {
  return <FlexPaperCol flexGrow={1} {...props} />
}

export { FlexGrowPaper, FlexGrowPaperCol, FlexPaper, FlexPaperCol }
