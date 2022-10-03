import { Env } from "../.."
import { Events } from "../../types/events"

export default abstract class EventCallback<T> {
    constructor(
        protected event: Extract<Extract<Events, { type: "event_callback" }>["event"], { type: T }>,
        protected env: Env,
    ) { }

    public abstract handle(): Promise<Response>
}
