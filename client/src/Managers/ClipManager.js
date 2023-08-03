const apiUrl = "https://localhost:5001";

export const getAllClips = () => {
    return fetch(`${apiUrl}/api/clip`)
    .then((r) => r.json())
};

export const getClipById = (id) => {
    return fetch(`${apiUrl}/api/clip/${id}`)
    .then((r) => r.json())
};

export const addClip = (singleClip) => {
    return fetch(`${apiUrl}/api/clip`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleClip)
    });
};

export const deleteClip = (id) => {
    return fetch(`${apiUrl}/api/clip/${id}`, {
        method: "DELETE",
    })
    .then(() => getAllClips())
};

export const getClipByCategory = (categoryId) => {
    return fetch(`${apiUrl}/api/clip/category/${categoryId}`)
    .then((r) => r.json())
}