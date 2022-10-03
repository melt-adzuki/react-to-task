import { Env } from ".."
import { Events } from "../types/events"
import ResponseProvider from "../utils/response-provider"
import EventCallback from "./base"
import ReactionAdded from "./reaction_added"

export default async function handleEvent(body: Events, env: Env): Promise<ResponseProvider> {
    if (body.type === "url_verification") {
        return ResponseProvider.custom("Successfully verified URL.", body.challenge, 200)
    }
    
    else if (body.type === "event_callback") {
        type CallbackTypes = Extract<Events, { type: "event_callback" }>["event"]["type"]

        const handlers: { [K in CallbackTypes]: EventCallback<K> } = {
            "reaction_added": new ReactionAdded(body.event, env),
        }
            
        return handlers[body.event.type].handle()
    }
    
    else {
        return ResponseProvider.fail("Unknown event type: " + (body as { type: string }).type)
    }
}
