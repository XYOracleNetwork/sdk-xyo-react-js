import { ButtonGroup } from '@mui/material'
import { ButtonEx } from '@xylabs/react-button'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import { ModuleDescriptionPayload, ModuleDescriptionSchema, ModuleInstance } from '@xyo-network/module-model'
import { isPayloadOfSchemaType } from '@xyo-network/payload-model'
import { Property } from '@xyo-network/react-property'
import React from 'react'

import { JsonViewerButton } from './JsonViewerButton.tsx'

export interface ModuleDetailsProps<T extends ModuleInstance = ModuleInstance> extends FlexBoxProps {
  mod?: T
}

export const ModuleDetails: React.FC<ModuleDetailsProps> = ({ mod, ...props }) => {
  const [manifest] = usePromise(async () => {
    return await mod?.manifest()
  }, [mod])

  const [discover] = usePromise(async () => {
    return await mod?.state()
  }, [mod])

  const [describe] = usePromise(async () => {
    const state = await mod?.state()
    return state?.find<ModuleDescriptionPayload>(isPayloadOfSchemaType(ModuleDescriptionSchema))
  }, [mod])

  const queries = mod?.queries

  const config = mod?.config

  return (
    <FlexCol alignItems="stretch" {...props}>
      <Property title="Address" value={mod?.address} />

      <FlexRow gap={1} justifyContent="space-between">
        <ButtonGroup>
          {manifest
            ? (
                <JsonViewerButton variant="contained" src={manifest}>
                  Manifest
                </JsonViewerButton>
              )
            : null}
          {config
            ? (
                <JsonViewerButton variant="contained" src={config}>
                  Config
                </JsonViewerButton>
              )
            : null}
          {discover
            ? (
                <JsonViewerButton variant="contained" src={discover}>
                  Discover
                </JsonViewerButton>
              )
            : null}
          {describe
            ? (
                <JsonViewerButton variant="contained" src={describe}>
                  Describe
                </JsonViewerButton>
              )
            : null}
          {queries
            ? (
                <JsonViewerButton variant="contained" src={queries}>
                  Queries
                </JsonViewerButton>
              )
            : null}
        </ButtonGroup>
        <ButtonGroup>
          <ButtonEx target="_blank" href={`https://explore.xyo.network/block?network=main&address=${mod?.address}`} variant="outlined">
            Main
          </ButtonEx>
          <ButtonEx target="_blank" href={`https://beta.explore.xyo.network/block?network=kerplunk&address=${mod?.address}`} variant="outlined">
            Kerplunk
          </ButtonEx>
          <ButtonEx target="_blank" href={`https://beta.explore.xyo.network/block?network=local&address=${mod?.address}`} variant="outlined">
            Local
          </ButtonEx>
        </ButtonGroup>
      </FlexRow>
    </FlexCol>
  )
}
