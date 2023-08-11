import React, { useEffect, useState } from "react";
import { getAllCategories } from "../../Managers/CategoryManager";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import { Category } from "./Category";
import "./Category.css";

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
            <h2 className="categories-title">Categories</h2>
            <Container>
                <Row>
                    {categories.map((category) => (
                        <Col sm="4" key={category.id}>
                            <Category category={category} />
                        </Col>
                    ))}
                </Row>
            </Container>
            <Button
                color="secondary"
                size="lg"
                onClick={backToHome}
            >Back</Button>
        </div>
    );
};

export default CategoryList;