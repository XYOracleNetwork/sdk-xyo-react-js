import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Property } from '../../../../../property'
import { PayloadValidationDetailsProps } from './ValidationDetailsProps'

const SchemaProperty: React.FC<PayloadValidationDetailsProps> = ({ value, nodeWebSiteUrl, viewSchemaUrl }) => {
  const navigate = useNavigate()

  const navigateToNodeUrl = (nodeWebSiteUrl: string) => {
    const newWindow = window.open(nodeWebSiteUrl, '_blank', 'noopener,noreferrer')
    if (newWindow) {
      newWindow.opener = null
    }
  }

  const propertyActions = useCallback(() => {
    const schemaUrl = viewSchemaUrl ?? `/${value?._hash}/schema`

    const actions = [{ name: 'View', onClick: () => navigate(schemaUrl) }]
    if (nodeWebSiteUrl) {
      actions.push({ name: 'Edit', onClick: () => navigateToNodeUrl(nodeWebSiteUrl) })
    }
    return actions
  }, [navigate, nodeWebSiteUrl, value?._hash, viewSchemaUrl])

  return <Property flexGrow={1} title="Schema" value={value?.schema} tip="Schema sent with the payload" actions={propertyActions()} />
}

export { SchemaProperty }
