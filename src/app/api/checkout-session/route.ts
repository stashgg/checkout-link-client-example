const CREATE_CHECKOUT_LINK_URL = "https://test-api.stash.gg/sdk/checkout_links/create";
// dont commit
const API_KEY = "LWAfQMU5AfbtOGKG5hoMnxe1VsCNdfNloxmBS50jvh1Op_rfsOIJf6l0iK4HDtMp"

const SAMPLE_ITEM = {
    "id": "stash-test-01",
    "pricePerItem": "3",
    "quantity": 1,
    "description": "Speed down the road at blazing speeds",
    "name": "Lambo",
    "imageUrl": "https://test.stash.gg/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fpartner_assets%2F100b734e-3631-4afc-9721-dd6e5f82475e%2Fdrive-to-survive%2FLambo%25202.png&w=640&q=75"
}

export async function POST() {
    const options = {
        method: 'POST',
        headers: {accept: 'application/json', 'content-type': 'application/json', 'X-Stash-Api-Key': API_KEY},
        body: JSON.stringify({shopHandle: 'iosdemo-test', currency:  'USD', externalUser: {id: "fake-userid-01"}, items: [SAMPLE_ITEM] }),
    };

    const res = await fetch(CREATE_CHECKOUT_LINK_URL, options);
    const data = await res.json()

    return Response.json(data)
}