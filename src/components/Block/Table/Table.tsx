import { Table, TableBody, TableCell, TableHead, TableProps, TableRow, Typography } from '@mui/material'
import { XyoBoundWitness } from '@xyo-network/sdk-xyo-client-js'

import { BlockTableRow } from './TableRow'

export interface BlockTableProps extends TableProps {
  validate?: boolean
  blocks?: XyoBoundWitness[] | null
  onRowClick?: (value: XyoBoundWitness) => void
  exploreDomain?: string
  showClient?: boolean
}

export const BlockTable: React.FC<BlockTableProps> = ({
  exploreDomain,
  validate = false,
  onRowClick,
  blocks,
  showClient = false,
  ...props
}) => {
  return (
    <Table {...props}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="caption">Hash</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="caption">Archive</Typography>
          </TableCell>
          {showClient ? (
            <TableCell align="center">
              <Typography variant="caption">Client</Typography>
            </TableCell>
          ) : null}
          <TableCell align="center">
            <Typography variant="caption">Date</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="caption">Time</Typography>
          </TableCell>
          <TableCell align="center">
            <Typography variant="caption">Payloads</Typography>
          </TableCell>
          {validate && (
            <TableCell align="center">
              <Typography variant="caption">Valid</Typography>
            </TableCell>
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {blocks?.map((block, index) => (
          <BlockTableRow
            exploreDomain={exploreDomain}
            validate={validate}
            key={index}
            block={block}
            onClick={
              onRowClick
                ? () => {
                    onRowClick(block)
                  }
                : undefined
            }
          />
        ))}
      </TableBody>
    </Table>
  )
}
