import EventBody from "../types/EventBody"
import ResponseProvider from "../../ResponseProvider"

export default abstract class EventCallback<T> {
    constructor(
        protected readonly event: Extract<Extract<EventBody, { type: "event_callback" }>["event"], { type: T }>,
    ) { }

    public abstract handle(): Promise<ResponseProvider>
}
