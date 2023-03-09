export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;

	SLACK_REACTION: string
	SLACK_BOT_TOKEN: string
	NOTION_TOKEN: string
	NOTION_DATABASE_ID: string
}

class Config implements Env {
	public SLACK_REACTION!: string
    public SLACK_BOT_TOKEN!: string
    public NOTION_TOKEN!: string
    public NOTION_DATABASE_ID!: string

	public init(env: Env) {
		this.SLACK_REACTION = env.SLACK_REACTION
        this.SLACK_BOT_TOKEN = env.SLACK_BOT_TOKEN
        this.NOTION_TOKEN = env.NOTION_TOKEN
        this.NOTION_DATABASE_ID = env.NOTION_DATABASE_ID
    }
}

const config = new Config()
export default config
