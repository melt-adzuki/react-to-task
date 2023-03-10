import { container } from "tsyringe"
import NotionTaskRepository from "./infrastructure/repositories/NotionTaskRepository"
import SlackNoteRepository from "./infrastructure/repositories/SlackNoteRepository"

container.register("TaskRepository", { useClass: NotionTaskRepository })
container.register("NoteRepository", { useClass: SlackNoteRepository })

export default container
