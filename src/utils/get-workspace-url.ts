const ENDPOINT = "https://slack.com/api/team.info"

export default async function getWorkspaceUrl(token: string): Promise<string> {
    const form = new FormData()
    form.set("token", token)

    const response = await fetch(ENDPOINT, {
        method: "POST",
        body: form,
    }).then(response => response.json()) as any

    return response.team.domain
}
