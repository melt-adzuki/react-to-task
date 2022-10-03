import NotionAPI from "../../notion-api"
import { Replies } from "../../types/replies"
import EventCallback from "./base"

export default class ReactionAdded extends EventCallback<"reaction_added"> {
    async handle(): Promise<Response> {        
        const replies = await fetch(
            `https://slack.com/api/conversations.history?channel=${this.event.item.channel}&oldest=${this.event.item.ts}&inclusive=true&limit=1`,
            {
                headers: {
                    "Authorization": `Bearer ${this.env.SLACK_TOKEN}`,
                },
            },
        ).then(response => response.json()) as Replies

        const notion = new NotionAPI(this.env.NOTION_TOKEN, this.env.NOTION_DATABASE_ID)
        await notion.addItem(replies.messages[0].text, "https://example.com")
        
        console.log(JSON.stringify(replies))
        return new Response("OK")
    }
}
