import { Env } from ".."
import { Events } from "../types/events"

export default abstract class Event<T> {
    constructor(
        protected body: Extract<Events, { type: T }>,
        protected env: Env,
    ) { }

    public abstract handle(): Promise<Response>
}
