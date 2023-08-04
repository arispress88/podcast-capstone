import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap";
import { getPostCommentsById } from "../../Managers/CommentManager";

export const PostComment = ({ postComment }) => {
    const [postComments, setPostComments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getPostCommentsById()
            .then(postComments => setPostComments(postComments))
    }, []);

    return (
        <Card className="m-4" color="light">
            <CardBody>
                <CardText>
                    {postComment.body}
                </CardText>
                <CardFooter>
                    Posted by: <Link to={`/userprofiles/${postComment.userProfileId}`}>{postComment.userProfile?.displayName} </Link>
                    on: {new Date(postComment.createDateTime).toLocaleDateString('en-US')}.
                </CardFooter>
            </CardBody>
        </Card>
    )
}