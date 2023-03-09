import Task from "../../domain/models/Task"
import TaskRepository from "../../domain/repositories/TaskRepository"
import { injectable, inject } from "tsyringe"
import ResponseProvider from "../../ResponseProvider"

@injectable()
export default class AddTaskService {
    constructor(
        @inject("TaskRepository")
        private taskRepository: TaskRepository
    ) { }

    async add(name: string, url: string): Promise<ResponseProvider> {
        const date = new Date
        date.setHours(date.getHours() + 9)

        const task = new Task(name, date, url)
        return await this.taskRepository.add(task)
    }
}
