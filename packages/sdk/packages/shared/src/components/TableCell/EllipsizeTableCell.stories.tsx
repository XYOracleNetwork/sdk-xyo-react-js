import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { Decorator, Meta, StoryFn } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { EllipsisTableCell } from './EllipsisTableCell.tsx'

const TableDecorator: Decorator = (Story, args) => {
  return (
    <BrowserRouter>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Heading1</TableCell>
            <TableCell>Heading2</TableCell>
            <TableCell>Heading3</TableCell>
            <TableCell>Heading4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Story {...args} />
        </TableBody>
      </Table>
    </BrowserRouter>
  )
}

export default {
  component: EllipsisTableCell,
  decorators: [TableDecorator],
  title: 'shared/EllipsisTableCell',
} as Meta

const Template: StoryFn<typeof EllipsisTableCell> = (props) => {
  return (
    <TableRow>
      <EllipsisTableCell to="/foo" value="As-Link-e0f01ab62384d8d501ff6b2f860b7992c347a6b8ae07bd5fd2fa4a7d47dad915" {...props} />
      <TableCell>d2fa4a7d47dad915501ff6b2f860b7992c347</TableCell>
      <TableCell>d2fa4a7d47dad915</TableCell>
      <TableCell>e0f05</TableCell>
    </TableRow>
  )
}

const TemplateWithMultiple: StoryFn<typeof EllipsisTableCell> = (props) => {
  return (
    <TableRow>
      <EllipsisTableCell width="50%" {...props}>
        As-children-e0f01ab62384d8d501ff6b2f860b7992c347a6b8ae07bd5fd2fa4a7d47dad915
      </EllipsisTableCell>
      <EllipsisTableCell width="50%" {...props}>
        e0f01ab62384d8d501ff6b2f860b7992c347a6b8ae07bd5fd2fa4a7d47dad915
      </EllipsisTableCell>
      <TableCell>d2fa4a7d47dad915</TableCell>
      <TableCell>e0f05</TableCell>
    </TableRow>
  )
}

const TemplateWithMultipleRows: StoryFn<typeof EllipsisTableCell> = (props) => {
  return (
    <>
      <TableRow>
        <EllipsisTableCell
          width="50%"
          href="http://foo.com"
          {...props}
          value="As-href-e0f01ab62384d8d501ff6b2f860b7992c347a6b8ae07bd5fd2fa4a7d47dad915"
        />
        <EllipsisTableCell width="50%" {...props}>
          e0f01ab62384d8d501ff6b2f860b7992c347a6b8ae07bd5fd2fa4a7d47dad915
        </EllipsisTableCell>
        <TableCell>d2fa4a7d47dad915</TableCell>
        <TableCell>e0f05</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>d2fa4a7d47dad915</TableCell>
        <TableCell>e0f05</TableCell>
        <EllipsisTableCell width="50%" {...props}>
          e0f01ab62384d8d501ff6b2f860b7992c347a6b8ae07bd5fd2fa4a7d47dad915
        </EllipsisTableCell>
        <EllipsisTableCell width="50%" {...props}>
          e0f01ab62384d8d501ff6b2f860b7992c347a6b8ae07bd5fd2fa4a7d47dad915
        </EllipsisTableCell>
      </TableRow>
    </>
  )
}

const Default = Template.bind({})
Default.args = {}

const WithMultiple = TemplateWithMultiple.bind({})
WithMultiple.args = {}

const WithMultipleRows = TemplateWithMultipleRows.bind({})
WithMultipleRows.args = {}

export { Default, WithMultiple, WithMultipleRows }
