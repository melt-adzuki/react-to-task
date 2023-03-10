import ResponseProvider from "../../ResponseProvider"
import Message from "../models/Message"

export default interface MessageRepository {
    get(id: string, roomId: string): Promise<Message>
    save(id: string, roomId: string, message: Message): Promise<ResponseProvider>
    url(id: string, roomId: string): Promise<string>
}
