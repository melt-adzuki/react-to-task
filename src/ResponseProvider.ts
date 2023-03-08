export default class ResponseProvider {
	constructor(
		private readonly condition: "success" | "failure" | "custom",
		private readonly description: string,
		private readonly content?: string,
		private readonly status?: number,
	) { }

	public static succeed(message: string) {
		return new this("success", message)
	}

	public static fail(reason: string) {
		return new this("failure", reason)
	}

	public static custom(description: string, content: string, status: number) {
		return new this("custom", description, content, status)
	}
	
	public fire(): Response {
		if (this.condition === "success") {
			const format = "[SUCCEEDED] " + this.description
			
			console.log(format)
			return new Response(format, { status: 200 })
		}
		
		else if (this.condition === "failure") {
			const format = "[FAILED] " + this.description

			console.log(format)
			return new Response(format, { status: 400 })
		}

		else {
			const format = this.description

			console.log(format)
			return new Response(this.content, { status: this.status })
		}
	}
}
