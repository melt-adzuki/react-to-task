import { Events } from "../types/events"
import { Replies } from "../types/replies"
import NotionAPI from "./notion-api"

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;

	SLACK_TOKEN: string
	NOTION_TOKEN: string
	NOTION_DATABASE_ID: string
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		if (!request.headers.get("content-type")?.startsWith("application/json")) {
			return fail("Content-Type must be application/json")
		}

		const body = await request.json() as Events

		switch (body.type) {
			case "url_verification":
				return new Response(body.challenge)
			
			case "event_callback": {
				const { event } = body

				switch (event.type) {
					case "reaction_added": {
						const replies = await fetch(
							`https://slack.com/api/conversations.history?channel=${event.item.channel}&oldest=${event.item.ts}&inclusive=true&limit=1`,
							{
								headers: {
									"Authorization": `Bearer ${env.SLACK_TOKEN}`,
								},
							},
						).then(response => response.json()) as Replies

						const notion = new NotionAPI(env.NOTION_TOKEN, env.NOTION_DATABASE_ID)
						await notion.addItem(replies.messages[0].text, "https://example.com")
						
						console.log(JSON.stringify(replies))
						return new Response("OK")
					}
						
					default:
						return fail("Invalid callback event type: " + event.type)
				}
			}
				
			default:
				return fail("Invalid event type: " + body.type)
		}
	}
}

function fail(reason: string) {
	console.log("Error: " + reason)
	return new Response(reason, { status: 400 })
}
