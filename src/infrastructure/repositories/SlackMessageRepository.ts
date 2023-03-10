import NoteRepository from "../../domain/repositories/MessageRepository"
import ResponseProvider from "../../ResponseProvider"
import Slack from "../clients/Slack"

export default class SlackMessageRepository implements NoteRepository {
    async get(ts: string, channel: string) {
        const message = await Slack.getMessage({ ts, channel })
        return message.text
    }

    async post(text: string, channel: string) {
        await Slack.postMessage({ text, channel })
        return ResponseProvider.succeed("The message has been posted to Slack.")
    }

    async reply(text: string, thread_ts: string, channel: string) {
        await Slack.postMessage({ text, thread_ts, channel })
        return ResponseProvider.succeed("The message has been replied to Slack.")
    }

    async url(id: string, roomId: string) {
        const workspaceUrl = await Slack.getWorkspaceUrl()
        return `https://${workspaceUrl}.slack.com/archives/${roomId}/p${id.replaceAll(".", "")}`
    }
}
