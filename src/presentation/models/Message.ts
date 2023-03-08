import config from "../../config"
import Replies from "../types/Replies"

export default class Message {
    constructor(
        public readonly text: string,
    ) { }

    public static async fromTimestamp(timestamp: string, channel: string) {
        const ENDPOINT = "https://slack.com/api/conversations.history"

        const message = await fetch(
            `${ENDPOINT}?channel=${channel}&oldest=${timestamp}&inclusive=true&limit=1`,
            {
                headers: {
                    "Authorization": `Bearer ${config.SLACK_BOT_TOKEN}`,
                },
            },
        ).then(response => response.json<Replies>())
         .then(replies => replies.messages[0])

        return new this(message.text)
    }
}
