import Task from "../../domain/models/Task"
import TaskRepository from "../../domain/repositories/TaskRepository"
import { inject, singleton } from "tsyringe"
import ResponseProvider from "../../ResponseProvider"
import NoteRepository from "../../domain/repositories/NoteRepository"

@singleton()
export default class AddTaskFromNoteService {
    constructor(
        @inject("TaskRepository")
        private taskRepository: TaskRepository,
        @inject("NoteRepository")
        private noteRepository: NoteRepository
    ) { }

    async execute(id: string, channel: string): Promise<ResponseProvider> {
        const note = await this.noteRepository.get(id, channel)
        const url = await this.noteRepository.url(id, channel)
        
        const date = new Date
        date.setHours(date.getHours() + 9)

        const task = new Task(note, date, url)
        const response = await this.taskRepository.add(task)

        await this.noteRepository.reply("タスクを追加しました💪", id, channel)
        return response
    }
}
