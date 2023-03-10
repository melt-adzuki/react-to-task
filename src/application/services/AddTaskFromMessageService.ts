import Task from "../../domain/models/Task"
import TaskRepository from "../../domain/repositories/TaskRepository"
import { inject, singleton } from "tsyringe"
import ResponseProvider from "../../ResponseProvider"
import NoteRepository from "../../domain/repositories/MessageRepository"

@singleton()
export default class AddTaskFromMessageService {
    constructor(
        @inject("TaskRepository")
        private taskRepository: TaskRepository,
        @inject("MessageRepository")
        private messageRepository: NoteRepository
    ) { }

    async execute(id: string, channel: string): Promise<ResponseProvider> {
        const message = await this.messageRepository.get(id, channel)
        const url = await this.messageRepository.url(id, channel)
        
        const date = new Date
        date.setHours(date.getHours() + 9)

        const task = new Task(message, date, url)
        const response = await this.taskRepository.add(task)

        await this.messageRepository.reply(`タスクを追加しました💪\nURL: ${url}`, id, channel)
        return response
    }
}
