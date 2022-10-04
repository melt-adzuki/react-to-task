import NotionAPI from "../notion-api"
import getMessageFromTs from "../utils/get-message-from-ts"
import getWorkspaceUrl from "../utils/get-workspace-url"
import ResponseProvider from "../utils/response-provider"
import EventCallback from "./base"

export default class ReactionAdded extends EventCallback<"reaction_added"> {
    async handle(): Promise<ResponseProvider> {        
        const message = await getMessageFromTs(this.event.item.channel, this.event.item.ts, this.env.SLACK_BOT_TOKEN)
        const workspaceUrl = await getWorkspaceUrl(this.env.SLACK_BOT_TOKEN)

        const notion = new NotionAPI(this.env.NOTION_TOKEN, this.env.NOTION_DATABASE_ID)
        await notion.addItem(
            message.text,
            new Date,
            `https://${workspaceUrl}.slack.com/archives/${this.event.item.channel}/p${this.event.item.ts.replaceAll(".", "")}`,
        )

        return ResponseProvider.succeed("Added new item to Notion: " + message.text)
    }
}
