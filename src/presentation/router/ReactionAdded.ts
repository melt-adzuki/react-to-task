import ResponseProvider from "../../ResponseProvider"
import EventCallback from "./EventCallback"
import { container } from "tsyringe"
import AddTaskService from "../../application/services/AddTaskService"
import Message from "../models/Message"
import WorkspaceUrl from "../models/WorkspaceUrl"
import config from "../../config"

export default class ReactionAdded extends EventCallback<"reaction_added"> {
    async handle(): Promise<ResponseProvider> {
        if (this.event.reaction !== config.SLACK_REACTION) {
            return ResponseProvider.succeed(`The reaction :${this.event.reaction}: is not the target.`)
        }

        const message = await Message.fromTimestamp(this.event.item.ts, this.event.item.channel)
        const workspaceUrl = await WorkspaceUrl.fetch()

        const addTaskService = container.resolve(AddTaskService)
        addTaskService.add(message.text, `https://${workspaceUrl.value}.slack.com/archives/${this.event.item.channel}/p${this.event.item.ts.replaceAll(".", "")}`)

        return ResponseProvider.succeed("Added new item to Notion: " + message.text)
    }
}
