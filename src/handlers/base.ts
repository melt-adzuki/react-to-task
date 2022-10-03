import { Env } from ".."
import { Events } from "../types/events"
import ResponseProvider from "../utils/response-provider"

export default abstract class EventCallback<T> {
    constructor(
        protected readonly event: Extract<Extract<Events, { type: "event_callback" }>["event"], { type: T }>,
        protected readonly env: Env,
    ) { }

    public abstract handle(): Promise<ResponseProvider>
}
