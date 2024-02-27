import { MenuItem, Typography } from '@mui/material'
import { SelectEx, SelectExProps } from '@xylabs/react-select'

import { useSchema } from '../../contexts'

export type SchemaSelectExProps = SelectExProps<string>

export const SchemaSelectEx: React.FC<SchemaSelectExProps> = ({ onChange, variant = 'outlined', ...props }) => {
  const { schema, setSchema, schemaList } = useSchema(false)

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
      {schemaList?.map((schema, index) => {
        return (
          <MenuItem key={index} value={schema}>
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
