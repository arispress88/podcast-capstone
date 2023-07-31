import React from "react";
import { Card, CardBody } from "reactstrap";

export const Category = ({ category }) => {
    return (
        <Card className="m-4" color="warning">
            <CardBody>
                <p>
                    <strong>{category.name}</strong>
                </p>
            </CardBody>
        </Card>
    );
};