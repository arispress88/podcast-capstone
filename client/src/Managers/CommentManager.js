const apiUrl = "https://localhost:5001";

export const getPostCommentsById = (id, postId) => {
    return fetch(`${apiUrl}/api/postcomment/getpostcommentsbypostid/${id}?postId=${postId}`)
    .then((r) => r.json())
};

export const addPostComment = (singlePostComment) => {
    return fetch (`${apiUrl}/api/postcomment`, {
        method:"POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singlePostComment)
    });
};