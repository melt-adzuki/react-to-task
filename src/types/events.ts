export type Events = {
    type: "url_verification"
    challenge: string
    token: string
} | {
    type: "event_callback"
    event: {
        type: "reaction_added"
        user: string
        reaction: string
        item_user: string
        event_ts: string
        item: {
            type: "message"
            channel: string
            ts: string
        }
    }
}
