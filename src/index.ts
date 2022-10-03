import { Events } from "./types/events"
import handleEvent from "./handlers"
import ResponseProvider from "./utils/response-provider"

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

	SLACK_BOT_TOKEN: string
	NOTION_TOKEN: string
	NOTION_DATABASE_ID: string
}

export default {
	async fetch(
		request: Request,
		env: Env,
		_ctx: ExecutionContext
	): Promise<Response> {
		if (!request.headers.get("content-type")?.startsWith("application/json")) {
			return ResponseProvider.fail("Content-Type must be application/json").makeResponse()
		}

		const body = await request.json() as Events | undefined

		if (!body || !body.type) {
			return ResponseProvider.fail("Invalid request").makeResponse()
		}

		return handleEvent(body, env).then(provider => provider.makeResponse())
	}
}
