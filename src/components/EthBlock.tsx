import { Box, Link, Typography } from '@mui/material'
import React from 'react'

interface EthAccountProps {
  block?: number
}

const EthBlock: React.FC<EthAccountProps> = (props: EthAccountProps) => {
  const { block } = props
  if (block) {
    return (
      <Box alignItems="center" display="flex" flexGrow={1} justifyContent="center" paddingX={1}>
        <Link href={`https://etherscan.io/block/${block}`} target="_blank" title={`Ethereum Block #${block}`}>
          <Typography variant="caption">{block}</Typography>
        </Link>
      </Box>
    )
  } else {
    return <Box />
  }
}

export default EthBlock
