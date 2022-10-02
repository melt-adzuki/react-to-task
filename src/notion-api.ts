import { Client } from "@notionhq/client"

export default class NotionAPI {
	notion: Client

	constructor(notionToken: string, private notionDatabaseId: string) {
		this.notion = new Client({ auth: notionToken })
	}

	async addItem(name: string, url: string) {
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
				"URL": {
					url,
				}
			},
		})

		console.log("Success! Entry added.")
	}
}
