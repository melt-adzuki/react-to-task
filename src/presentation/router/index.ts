import EventBody from "../types/EventBody"
import ResponseProvider from "../../ResponseProvider"
import EventCallback from "./EventCallback"
import ReactionAdded from "./ReactionAdded"

export default async function handleEvent(body: EventBody): Promise<ResponseProvider> {
    if (body.type === "url_verification") {
        return ResponseProvider.custom("Successfully verified URL.", body.challenge, 200)
    }

    else if (body.type === "event_callback") {
        type CallbackTypes = Extract<EventBody, { type: "event_callback" }>["event"]["type"]

        const handlers: { [K in CallbackTypes]: EventCallback<K> } = {
            "reaction_added": new ReactionAdded(body.event),
        }
            
        return handlers[body.event.type].handle()
    }
    
    else {
        return ResponseProvider.fail("Unknown event type: " + (body as { type: string }).type)
    }
}
