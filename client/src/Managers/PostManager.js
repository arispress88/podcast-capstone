const apiUrl = "https://localhost:5001";

export const getAllPosts = () => {
    return fetch(`${apiUrl}/api/post`)
    .then((r) => r.json())
};

export const getPostById = (id) => {
    return fetch(`${apiUrl}/api/post/${id}`)
    .then((r) => r.json())
};

export const addPost = (singlePost) => {
    return fetch(`${apiUrl}/api/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(singlePost)
    });
};

export const deletePost = (id) => {
    return fetch(`${apiUrl}/api/post/${id}`, {
        method: "DELETE",
    })
    .then(() => getAllPosts())
};