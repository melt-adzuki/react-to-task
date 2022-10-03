import { Env } from ".."
import { Events } from "../types/events"
import fail from "../utils/fail"
import UrlVerification from "./url_verification"
import ReactionAdded from "./callbacks/reaction_added"

export default function handleEvent(body: Events, env: Env): Promise<Response> {
    switch (body.type) {
        case "url_verification":
            return new UrlVerification(body, env).handle()
        
        case "event_callback": {
            const { event } = body

            switch (event.type) {
                case "reaction_added":
                    return new ReactionAdded(event, env).handle()
                
                default:
                    return fail("Unknown event callback type: " + event.type)
            }
        }
            
        default:
            return fail("Unknown event type: " + (body as { type: string }).type)
    }
}
