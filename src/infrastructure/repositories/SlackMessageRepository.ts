import Message from "../../domain/models/Message"
import MessageRepository from "../../domain/repositories/MessageRepository"
import ResponseProvider from "../../ResponseProvider"
import Slack from "../clients/Slack"

export default class SlackMessageRepository implements MessageRepository {
    async get(id: string, roomId: string) {
        const message = await Slack.getMessage(id, roomId)
        return new Message(message.text)
    }

    async save(id: string, roomId: string, message: Message) {
        await Slack.postMessage(id, roomId, message.content)
        return ResponseProvider.succeed("The message has been saved to Slack.")
    }

    async url(id: string, roomId: string) {
        const workspaceUrl = await Slack.getWorkspaceUrl()
        return `https://${workspaceUrl}.slack.com/archives/${roomId}/p${id.replaceAll(".", "")}`
    }
}
