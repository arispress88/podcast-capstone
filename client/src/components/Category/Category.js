import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

export const Category = ({ category }) => {
    return (
        <Card className="m-4" color="warning">
            <CardBody>
                <p>
                   <Link to={`/clips/category/${category.name}`}><strong>{category.name}</strong></Link> 
                </p>
            </CardBody>
        </Card>
    );
};