import BaseEvent from './BaseEvent'

class StandardEvent<T extends Record<string, unknown>> extends BaseEvent<T> {}

export default StandardEvent
