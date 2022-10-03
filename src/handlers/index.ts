import { Env } from ".."
import { Events } from "../types/events"
import fail from "../utils/fail"
import EventCallback from "./base"
import ReactionAdded from "./reaction_added"

export default function handleEvent(body: Events, env: Env): Promise<Response> {
    if (body.type === "url_verification") {
        return new Promise(resolve => {
            resolve(new Response(body.challenge))
        })
    }
    
    else if (body.type === "event_callback") {
        type CallbackTypes = Extract<Events, { type: "event_callback" }>["event"]["type"]

        const handlers: { [K in CallbackTypes]: EventCallback<K> } = {
            "reaction_added": new ReactionAdded(body.event, env),
        }
            
        return handlers[body.event.type].handle()
    }
    
    else {
        return fail("Unknown event type: " + (body as { type: string }).type)
    }
}
