import { Extension as ExtensionIcon } from '@mui/icons-material'
import { delay } from '@xylabs/delay'
import { FlexBoxProps, FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { ModuleInstance } from '@xyo-network/module-model'
import { useModulesFromNode } from '@xyo-network/react-node'
import { TypographyEx } from '@xyo-network/react-shared'
import { ReactNode, useState } from 'react'

export interface ModuleSummaryProps<T extends ModuleInstance = ModuleInstance> extends FlexBoxProps {
  icon?: ReactNode
  module?: T
}

export const ModuleSummary: React.FC<ModuleSummaryProps> = ({ children, icon, module, ...props }) => {
  const [downModules] = useModulesFromNode(undefined, { direction: 'down' })
  const [upModules] = useModulesFromNode(undefined, { direction: 'up' })
  const [busy, setBusy] = useState(false)

  const downModulesFromResolve = downModules?.length
  const upModulesFromResolve = upModules?.length

  module?.on('moduleBusy', async ({ busy }) => {
    setBusy(busy)
    await delay(2000)
    setBusy(false)
  })

  return (
    <FlexCol alignItems="stretch" width="100%" {...props}>
      <FlexRow justifyContent="flex-start">
        <FlexRow>
          <TypographyEx color={busy ? 'gray' : undefined}>{icon ?? <ExtensionIcon />}</TypographyEx>
          <TypographyEx marginX={1}>{module?.config?.name ?? '<Unknown>'}</TypographyEx>
        </FlexRow>
        {children ?? (downModulesFromResolve !== undefined && upModulesFromResolve !== undefined)
          ? `[${downModulesFromResolve}↓/${upModulesFromResolve}↑]`
          : null}
      </FlexRow>
    </FlexCol>
  )
}
