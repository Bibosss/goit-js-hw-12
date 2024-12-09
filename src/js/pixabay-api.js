const BASE_URL = "https://pixabay.com/api/";

let page = 1;
let per_page = 15;

export const pixabayApi = (searchQuery, page, per_page) => {
    const params = new URLSearchParams({
        key: "47362908-c1a65ba58d6ddf3afd8961379",
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page,
        per_page: per_page,
    })

    return fetch(`${BASE_URL}?${params}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
}