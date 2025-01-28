import { CheckCircle } from '@mui/icons-material'
import { Chip, type ChipProps } from '@mui/material'
import React from 'react'

export interface ValidationChipsProps extends ChipProps {
  dataHash?: string
  rootHash?: string
  valid?: boolean
}
export const ValidationChips: React.FC<ValidationChipsProps> = ({
  dataHash, rootHash, valid,
}) => {
  return (
    <>
      {valid ? <Chip avatar={<CheckCircle color="success" />} label="Protocol Valid" /> : null}
      {rootHash ? <Chip label={`Root Hash: ${rootHash}`} title={rootHash} /> : null}
      {dataHash ? <Chip label={`Data Hash: ${dataHash}`} title={dataHash} /> : null}
    </>
  )
}
