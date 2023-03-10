import config from "../../config"
import Replies from "../../presentation/types/Replies"

const Slack = {
    async getWorkspaceUrl() {
        const ENDPOINT = "https://slack.com/api/team.info"

        const form = new FormData
        form.set("token", config.SLACK_BOT_TOKEN)

        const workspaceUrl = await fetch(ENDPOINT, {
            method: "POST",
            body: form,
        }).then(response => response.json<any>())
          .then(response => response.team.domain)

        return workspaceUrl
    },

    async getMessage({ ts, channel }: { ts: string, channel: string }) {
        const ENDPOINT = "https://slack.com/api/conversations.history"

        const message = await fetch(
            `${ENDPOINT}?channel=${channel}&oldest=${ts}&inclusive=true&limit=1`,
            {
                headers: {
                    "Authorization": `Bearer ${config.SLACK_BOT_TOKEN}`,
                },
            },
        ).then(response => response.json<Replies>())
         .then(replies => replies.messages[0])
        
        return message
    },

    async postMessage(body: { thread_ts?: string, channel: string, text: string }) {
        const ENDPOINT = "https://slack.com/api/chat.postMessage"

        await fetch(ENDPOINT,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Authorization": `Bearer ${config.SLACK_BOT_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        )
    }
}

export default Slack
