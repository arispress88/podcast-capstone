const apiUrl = "https://localhost:5001";

export const getAllEpisodes = () => {
    return fetch(`${apiUrl}/api/fullepisodes`)
    .then((r) => r.json())
};

export const addFullEpisode = (singleEpisode) => {
    return fetch(`${apiUrl}/api/fullepisodes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleEpisode)
    });
};

export const deleteClip = (id) => {
    return fetch(`${apiUrl}/api/fullepisodes/${id}`, {
        method: "DELETE",
    })
    .then(() => getAllEpisodes())
};

export const getEpisodeByCategory = (categoryId) => {
    return fetch(`${apiUrl}/api/fullepisodes/category/${categoryId}`)
    .then((r) => r.json())
};