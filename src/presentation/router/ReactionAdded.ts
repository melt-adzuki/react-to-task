import ResponseProvider from "../../ResponseProvider"
import EventCallback from "./EventCallback"
import { container } from "tsyringe"
import AddTaskFromMessageService from "../../application/services/AddTaskFromMessageService"
import config from "../../config"

export default class ReactionAdded extends EventCallback<"reaction_added"> {
    async handle(): Promise<ResponseProvider> {
        if (this.event.reaction !== config.SLACK_REACTION) {
            return ResponseProvider.succeed(`The reaction :${this.event.reaction}: is not the target.`)
        }
        
        const addTaskFromMessageService = container.resolve(AddTaskFromMessageService)
        return addTaskFromMessageService.execute(this.event.item.ts, this.event.item.channel)
    }
}
