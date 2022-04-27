import FilterNoneIcon from '@mui/icons-material/FilterNone'
import { LinkEx } from '@xylabs/sdk-react'

import { Property, PropertyValue } from '../../../../property'
import { PayloadValidationDetailsProps } from './ValidationDetailsProps'

const SchemaProperty: React.FC<PayloadValidationDetailsProps> = ({ value, viewSchemaUrl }) => {
  return (
    <Property flexGrow={1} title="Schema" value={value?.schema} tip="Schema sent with the payload">
      {viewSchemaUrl ? (
        <LinkEx to={viewSchemaUrl} target="_blank" rel="noopener noreferrer" display="flex">
          <PropertyValue paddingFactor={1} value={value?.schema} title="view schema in new window" />
          <FilterNoneIcon sx={{ left: '-6px', position: 'relative', top: '9px', width: '12px' }} />
        </LinkEx>
      ) : null}
    </Property>
  )
}

export { SchemaProperty }
