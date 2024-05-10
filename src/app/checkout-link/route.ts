const CREATE_CHECKOUT_LINK_URL = "https://test-api.stash.gg/sdk/checkout_links/create";

export async function POST() {
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json', 'X-Stash-Api-Key': "TBA"}
    };

    const res = await fetch(CREATE_CHECKOUT_LINK_URL, options);
    const data = await res.json()

    return Response.json(data)
}