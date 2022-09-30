import { Variant } from '@mui/material/styles/createTypography'
import { EllipsizeBox, EllipsizeBoxProps } from '@xyo-network/react-shared'

export interface PropertyValueProps extends EllipsizeBoxProps {
  value?: string | number | boolean | null
  typographyVariant?: Variant
}

export const PropertyValue: React.FC<PropertyValueProps> = ({ value, typographyVariant = 'body1', ...props }) => {
  return value !== undefined ? (
    <EllipsizeBox typographyProps={{ component: undefined, title: value?.toString(), variant: typographyVariant }} width="100%" {...props}>
      {value}
    </EllipsizeBox>
  ) : null
}
