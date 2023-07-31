import React from "react";

const apiUrl = "https://localhost:5001";

export const getAllCategories = () => {
    return fetch("/api/category")
    .then((r) => r.json())
};

export const getCategoryById = (id) => {
    return fetch(`${apiUrl}/api/categoy/${id}`).then((r) => r.json())
};