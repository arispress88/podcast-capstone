const apiUrl = "https://localhost:5001";

export const getPostCommentsById = (postId) => {
    return fetch(`${apiUrl}/api/postcomment/getpostcommentsbypostid/${postId}`)
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

export const getClipCommentsById = (id, clipId) => {
    return fetch(`${apiUrl}/api/clipcomment/getclipcomments/${id}?clipId=${clipId}`)
    .then((r) => r.json())
};

export const addClipComment = (singleClipComment) => {
    return fetch(`${apiUrl}/api/clipcomment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singleClipComment)
    });
};

export const editPostComment = (postComment) => {
    return fetch(`${apiUrl}/api/postcomment/${postComment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postComment)
    })
    .then(() => getPostCommentsById(postComment.id))
}

export const editClipComment = (clipComment) => {
    return fetch(`${apiUrl}/api/clipcomment/${clipComment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clipComment)
    })
    .then(() => getClipCommentsById())
}

export const deletePostComment = (id) => {
    return fetch(`${apiUrl}/api/postcomment/${id}`, {
        method: "DELETE",
    })
    .then(() => getPostCommentsById())
}

export const deleteClipComment = (id) => {
    return fetch(`${apiUrl}/api/clipcomment/${id}`, {
        method: "DELETE",
    })
    .then(() => getClipCommentsById())
}