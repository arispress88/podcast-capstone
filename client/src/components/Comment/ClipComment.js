import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap";
import { getClipCommentsById } from "../../Managers/CommentManager";

export const ClipComment = ({ clipComment }) => {
    const [clipComments, setClipComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getClipCommentsById()
            .then(clipComments => setClipComments(clipComments))
    }, []);

    return (
        <Card className="m-4" color="light">
            <CardBody>
                <CardText>
                    {clipComment.body}
                </CardText>
                <CardFooter>
                    Posted by: <Link to={`/userprofiles/${clipComment.userProfileId}`}>{clipComment.userProfile?.displayName} </Link>
                    on: {new Date(clipComment.createDateTime).toLocaleDateString('en-US')}.
                </CardFooter>
            </CardBody>
        </Card>
    )
}
