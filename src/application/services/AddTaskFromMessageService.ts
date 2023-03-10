import Task from "../../domain/models/Task"
import TaskRepository from "../../domain/repositories/TaskRepository"
import { inject, singleton } from "tsyringe"
import ResponseProvider from "../../ResponseProvider"
import MessageRepository from "../../domain/repositories/MessageRepository"

@singleton()
export default class AddTaskFromMessageService {
    constructor(
        @inject("TaskRepository")
        private taskRepository: TaskRepository,
        @inject("MessageRepository")
        private messageRepository: MessageRepository
    ) { }

    async execute(id: string, roomId: string): Promise<ResponseProvider> {
        const message = await this.messageRepository.get(id, roomId)
        const messageUrl = await this.messageRepository.url(id, roomId)
        
        const date = new Date
        date.setHours(date.getHours() + 9)

        const task = new Task(message.content, date, messageUrl)
        return await this.taskRepository.add(task)
    }
}
