import ResponseProvider from "../../ResponseProvider"
import EventCallback from "./EventCallback"
import AddTaskFromNoteService from "../../application/services/AddTaskFromNoteService"
import config from "../../config"
import container from "../../container"

export default class ReactionAdded extends EventCallback<"reaction_added"> {
    async handle(): Promise<ResponseProvider> {
        if (this.event.reaction !== config.SLACK_REACTION) {
            return ResponseProvider.succeed(`The reaction :${this.event.reaction}: is not the target.`)
        }
        
        const addTaskFromNoteService = container.resolve(AddTaskFromNoteService)
        return addTaskFromNoteService.execute(this.event.item.ts, this.event.item.channel)
    }
}
