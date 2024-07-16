/**
 * Reports that a control is valid, meaning that no errors exist in the input value.
 */
export const VALID = 'VALID' as const

/**
 * Reports that a control is invalid, meaning that an error exists in the input value.
 */
export const INVALID = 'INVALID' as const

/**
 * Reports that a control is pending, meaning that async validation is occurring and
 * errors are not yet available for the input value.
 */
export const PENDING = 'PENDING' as const

/**
 * Reports that a control is disabled, meaning that the control is exempt from ancestor
 * calculations of validity or value.
 */
export const DISABLED = 'DISABLED' as const

/**
 * A control can have several different statuses. Each
 * possible status is returned as a string literal.
 *
 * * **VALID**: Reports that a control is valid, meaning that no errors exist in the input
 * value.
 * * **INVALID**: Reports that a control is invalid, meaning that an error exists in the input
 * value.
 * * **PENDING**: Reports that a control is pending, meaning that async validation is
 * occurring and errors are not yet available for the input value.
 * * **DISABLED**: Reports that a control is
 * disabled, meaning that the control is exempt from ancestor calculations of validity or value.
 */
export type FormControlStatus = typeof VALID | typeof INVALID | typeof PENDING | typeof DISABLED
