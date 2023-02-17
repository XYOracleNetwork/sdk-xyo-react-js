import { Variant } from '@mui/material/styles/createTypography'
import { EllipsizeBox, EllipsizeBoxProps } from '@xyo-network/react-shared'

export interface PropertyValueProps extends EllipsizeBoxProps {
  typographyVariant?: Variant
  value?: string | number | boolean | null
}

export const PropertyValue: React.FC<PropertyValueProps> = ({ typographyVariant = 'body1', value, ...props }) => {
  return value !== undefined ? (
    <EllipsizeBox typographyProps={{ component: undefined, title: value?.toString(), variant: typographyVariant }} width="100%" {...props}>
      {value}
    </EllipsizeBox>
  ) : null
}
