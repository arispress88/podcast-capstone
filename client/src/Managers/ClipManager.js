const apiUrl = "https://localhost:5001";

export const getAllClips = () => {
    return fetch(`${apiUrl}/api/clip`)
    .then((r) => r.json())
};

export const getClipById = (id) => {
    return fetch(`${apiUrl}/api/clip/${id}`)
}