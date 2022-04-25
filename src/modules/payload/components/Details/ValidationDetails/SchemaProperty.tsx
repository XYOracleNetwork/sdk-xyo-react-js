import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Property } from '../../../../property'
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
    const actions = []

    if (viewSchemaUrl) {
      actions.push({ name: 'View', onClick: () => navigate(viewSchemaUrl) })
    }
    if (nodeWebSiteUrl) {
      actions.push({ name: 'Clone', onClick: () => navigateToNodeUrl(nodeWebSiteUrl) })
    }
    return actions
  }, [navigate, nodeWebSiteUrl, viewSchemaUrl])

  return <Property flexGrow={1} title="Schema" value={value?.schema} tip="Schema sent with the payload" actions={propertyActions()} />
}

export { SchemaProperty }
