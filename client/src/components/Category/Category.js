import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import wwe from "../../img/wwe-logo.png"
import wcw from "../../img/pngwing.com.png"

export const Category = ({ category }) => {
    return (
        <Card className="m-4" color="secondary" outline>
            <CardBody>
                <p>
                    {category.id === 1 && 
                   <Link to={`/clips/category/wwe`}>
                    <img className="wwe" src={wwe} alt="WWE Logo" />
                   </Link> 
                    }
                    {category.id === 2 &&
                    <Link to={("/clips/category/wcw")}>
                        <img className="wcw" src={wcw} alt="WCW Logo" />
                    </Link>
                    }
                </p>
            </CardBody>
        </Card>
    );
};