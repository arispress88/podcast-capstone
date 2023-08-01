import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap"
import { getAllPosts } from "../../Managers/PostManager";

export const Post = ({ post }) => {
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllPosts()
            .then(posts => setPosts(posts));
    }, []);

    return (
        <Card
            body
            className="text-center"
            style={{
                width: '100%'
            }}
        >
            <CardBody>
                <CardTitle tag="h5">
                    {post.title}
                </CardTitle>
                <CardText>
                    {post.body}
                </CardText>
                <Button
                    color="primary"
                    onClick={() => navigate(`/posts/${post.id}`)}
                >Details

                </Button>
            </CardBody>
            <CardFooter>
                Posted by: <Link to={`/userprofiles/${post.userProfileId}`}>{post.userProfile?.displayName} </Link>
                 on: {new Date(post.createDateTime).toLocaleDateString('en-US')}.
            </CardFooter>
        </Card>
    )
} 