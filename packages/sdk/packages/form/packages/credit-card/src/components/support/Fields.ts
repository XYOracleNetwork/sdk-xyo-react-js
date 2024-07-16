export const NameFields = ['firstName', 'lastName'] as const
export const NameLabels = ['First', 'Last'] as const
export type NameLabel = (typeof NameLabels)[number]
