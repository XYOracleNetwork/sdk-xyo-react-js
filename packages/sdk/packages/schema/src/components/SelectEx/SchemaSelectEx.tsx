import { MenuItem, Typography } from '@mui/material'
import type { SelectExProps } from '@xylabs/react-select'
import { SelectEx } from '@xylabs/react-select'
import React from 'react'

import { useSchema } from '../../contexts/index.ts'

export type SchemaSelectExProps = SelectExProps<string>

export const SchemaSelectEx: React.FC<SchemaSelectExProps> = ({
  onChange, variant = 'outlined', ...props
}) => {
  const {
    schema, setSchema, schemaList,
  } = useSchema(false)

  return (
    <SelectEx
      variant={variant}
      size="small"
      value={schema ?? 'none'}
      onChange={(event, child) => {
        if (event.target.value !== schema) {
          onChange?.(event, child)
          setSchema?.(event.target.value)
        }
      }}
      renderValue={(value) => {
        return <Typography>{value === 'none' ? '- None -' : value}</Typography>
      }}
      {...props}
    >
      {schemaList?.map((schema) => {
        return (
          <MenuItem key={schemaList.indexOf(schema)} value={schema}>
            {schema}
          </MenuItem>
        )
      })}
      <MenuItem key="none" value="none">
        - None -
      </MenuItem>
    </SelectEx>
  )
}
