import Task from "../../domain/models/Task"
import TaskRepository from "../../domain/repositories/TaskRepository"
import { Client } from "@notionhq/client"
import config from "../../config"
import ResponseProvider from "../../ResponseProvider"

export default class NotionTaskRepository implements TaskRepository {
    private client = new Client({ auth: config.NOTION_TOKEN })
    
    public async add(task: Task): Promise<ResponseProvider> {
        // URLが一致するかどうかで重複チェック
        const pages = await this.client.databases.query({
            database_id: config.NOTION_DATABASE_ID,
            filter: {
                property: "URL",
                url: {
                    equals: task.url,
                },
            },
        })

        if (pages.results.length > 0) {
            return ResponseProvider.succeed("The task already exists. Skip adding.");
        }

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

        return ResponseProvider.succeed("Added new item to Notion: " + task.name)
    }
}
