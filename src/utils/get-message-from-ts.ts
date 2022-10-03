import { Replies } from "../types/replies"

const ENDPOINT = "https://slack.com/api/conversations.history"

export default async function getMessageFromTs(
    channel: string,
    ts: string,
    token: string,
): Promise<Replies["messages"][number]> {
    const replies = await fetch(
        `${ENDPOINT}?channel=${channel}&oldest=${ts}&inclusive=true&limit=1`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        },
    ).then(response => response.json()) as Replies

    return replies.messages[0]
}
