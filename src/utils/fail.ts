export default async function fail(reason: string) {
	console.log("Error: " + reason)
	return new Response(reason, { status: 400 })
}
