/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { createContextEx } from '@xyo-network/react-shared'

import { PanelContextState } from './State'

/** @deprecated - use sentinel package instead */
export const PanelContext = createContextEx<PanelContextState>()
