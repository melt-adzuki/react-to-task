import NotionAPI from "../notion-api"
import getMessageFromTs from "../utils/get-message-from-ts"
import ResponseProvider from "../utils/response-provider"
import EventCallback from "./base"

export default class ReactionAdded extends EventCallback<"reaction_added"> {
    async handle(): Promise<ResponseProvider> {        
        const message = await getMessageFromTs(this.event.item.channel, this.event.item.ts, this.env.SLACK_BOT_TOKEN)

        const notion = new NotionAPI(this.env.NOTION_TOKEN, this.env.NOTION_DATABASE_ID)
        await notion.addItem(message.text, "https://example.com")

        return ResponseProvider.succeed("Added new item to Notion: " + message.text)
    }
}
