import ResponseProvider from "../../ResponseProvider"

export default interface NoteRepository {
    get(id: string, channel: string): Promise<string>
    post(content: string, channel: string): Promise<ResponseProvider>
    reply(content: string, id: string, channel: string): Promise<ResponseProvider>
    url(id: string, channel: string): Promise<string>
}
