export const eventTypes = {
    TRANSIENT_STATE_CHANGED: "transientStateChanged"
}

export const dispatchTransientState = (field, value) => {
    const event = new CustomEvent(eventTypes.TRANSIENT_STATE_CHANGED, {
        detail: { field, value }
    })
    document.dispatchEvent(event)
}