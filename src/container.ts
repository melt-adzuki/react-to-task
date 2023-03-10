import { container } from "tsyringe"
import NotionTaskRepository from "./infrastructure/repositories/NotionTaskRepository"
import SlackMessageRepository from "./infrastructure/repositories/SlackMessageRepository"

container.register("TaskRepository", { useClass: NotionTaskRepository })
container.register("MessageRepository", { useClass: SlackMessageRepository })

export default container
