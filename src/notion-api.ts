import { Client } from "@notionhq/client"

export default class NotionAPI {
	private readonly notion: Client

	constructor(notionToken: string, private notionDatabaseId: string) {
		this.notion = new Client({ auth: notionToken })
	}

	async addItem(name: string, date: Date, url: string) {
		date.setHours(date.getHours() + 9)
		
		await this.notion.pages.create({
			parent: { database_id: this.notionDatabaseId },
			properties: {
				"名前": {
					title: [{
						text: {
							content: name,
						},
					}],
				},
				"日付": {
					date: {
						start: date.toISOString(),
						time_zone: "Asia/Tokyo",
					},
				},
				"URL": {
					url,
				},
			},
		})
	}
}
