import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap";
import { getPostCommentsById } from "../../Managers/CommentManager";

export const PostComment = ({ postComment }) => {
    const [postComments, setPostComments] = useState([]);
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const navigate = useNavigate();

    useEffect(() => {
        getPostCommentsById()
            .then(postComments => setPostComments(postComments))
    }, []);

    const editButtonForUser = () => {
        if (postComment.userProfileId === aewrUserObject.id) {
            return <>
            <Button color="warning" onClick={() => navigate(`/postcomment/edit/${postComment.id}`)}>
                Edit
            </Button>
            </>
        }
    }

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
                {editButtonForUser()}
            </CardBody>
        </Card>
    )
}