import ResponseProvider from "../../ResponseProvider"
import EventCallback from "./EventCallback"
import { container } from "tsyringe"
import AddTaskService from "../../application/services/AddTask"
import Message from "../models/Message"
import WorkspaceUrl from "../models/WorkspaceUrl"

export default class ReactionAdded extends EventCallback<"reaction_added"> {
    async handle(): Promise<ResponseProvider> {
        const message = await Message.fromTimestamp(this.event.item.ts, this.event.item.channel)
        const workspaceUrl = await WorkspaceUrl.fetch()

        const addTaskService = container.resolve(AddTaskService)
        addTaskService.add(message.text, `https://${workspaceUrl.value}.slack.com/archives/${this.event.item.channel}/p${this.event.item.ts.replaceAll(".", "")}`)

        return ResponseProvider.succeed("Added new item to Notion: " + message.text)
    }
}
