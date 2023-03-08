type Replies = {
    ok: boolean
    messages: {
        type: "message"
        user: string
        text: string
        thread_ts: string
        reply_count: number
        reply_users: string[]
        reply_users_count: number
        latest_reply: string
        subscribed: boolean
        last_read: string
        unread_count: number
        ts: string
    }[]
    has_more: boolean
    response_metadata: {
        next_cursor: string
    }
}

export default Replies
