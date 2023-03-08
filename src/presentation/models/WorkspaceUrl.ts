import config from "../../config"

export default class WorkspaceUrl {
    constructor(
        public readonly value: string,
    ) { }

    public static async fetch() {
        const ENDPOINT = "https://slack.com/api/team.info"

        const form = new FormData()
        form.set("token", config.SLACK_BOT_TOKEN)

        const response = await fetch(ENDPOINT, {
            method: "POST",
            body: form,
        }).then(response => response.json()) as any

        return new this(response.team.domain)
    }
}