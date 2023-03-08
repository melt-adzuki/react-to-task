import Task from "../../domain/models/Task"
import TaskRepository from "../../domain/repositories/TaskRepository"
import { Client } from "@notionhq/client"
import config from "../../config"

export default class NotionTaskRepository implements TaskRepository {
    private client = new Client({ auth: config.NOTION_TOKEN })
    
    public async add(task: Task) {
        await this.client.pages.create({
            parent: { database_id: config.NOTION_DATABASE_ID },
            properties: {
                "名前": {
                    title: [{
                        text: {
                            content: task.name,
                        },
                    }],
                },
                "日付": {
                    date: {
                        start: task.date.toISOString(),
                        time_zone: "Asia/Tokyo",
                    },
                },
                "URL": {
                    url: task.url,
                },
            },
        })
    }
}
