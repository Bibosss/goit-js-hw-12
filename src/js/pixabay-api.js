const BASE_URL = "https://pixabay.com/api/";

export const pixabayApi = async ({ searchQuery, page = 1, per_page = 15 }) => {
    const params = new URLSearchParams({
        key: "47362908-c1a65ba58d6ddf3afd8961379",
        q: searchQuery,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
        page,
        per_page
    });

    try {
        const response = await fetch(`${BASE_URL}?${params}`);
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
    }
};


// export const pixabayApi = (searchQuery, page, per_page) => {
//     const params = new URLSearchParams({
//         key: "47362908-c1a65ba58d6ddf3afd8961379",
//         q: searchQuery,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: "true",
//         page,
//         per_page: per_page,
//     })

//     return fetch(`${BASE_URL}?${params}`)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(response.statusText);
//             }
//             return response.json();
//         })
// }