import "reflect-metadata"
import EventBody from "./presentation/types/EventBody"
import handleEvent from "./presentation/router"
import ResponseProvider from "./ResponseProvider"
import config, { Env } from "./config"

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(
		request: Request,
		env: Env,
		_ctx: ExecutionContext
	): Promise<Response> {
		config.init(env)
		
		if (!request.headers.get("content-type")?.startsWith("application/json")) {
			return ResponseProvider.fail("Content-Type must be application/json").fire()
		}

		const body = await request.json() as EventBody | undefined

		if (!body || !body.type) {
			return ResponseProvider.fail("Invalid request").fire()
		}

		return handleEvent(body).then(provider => provider.fire())
	}
}
