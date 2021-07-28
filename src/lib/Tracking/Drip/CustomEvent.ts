import BaseEvent from './BaseEvent'

class CustomEvent<T extends Record<string, unknown>> extends BaseEvent<T> {}

export default CustomEvent
