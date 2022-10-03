import Event from "./base"

export default class UrlVerification extends Event<"url_verification"> {
    handle(): Promise<Response> {
        return new Promise(resolve => {
            resolve(new Response(this.body.challenge))
        })
    }
}
