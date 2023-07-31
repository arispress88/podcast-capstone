import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { Category } from "./Category";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getAllCategories().then(allCategories => setCategories(allCategories));
    };

    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, []);

    const backToHome = (e) => {
        navigate("/")
    };

    return (
        <div className="categories text-center">
            <h2>Categories</h2>
            <Container>
                <Row>
                    {categories.map((category) => (
                        <Col sm="4" key={category.id}>
                            <Category category={category} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default CategoryList;