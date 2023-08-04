const apiUrl = "https://localhost:5001";

export const getPostCommentsById = (postId) => {
    return fetch(`${apiUrl}/api/postcomment/getpostcommentsbypostid/${postId}`)
    .then((r) => r.json())
};