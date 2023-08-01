import { useEffect, useState } from "react";
import { getAllPosts } from "../../Managers/PostManager";
import { Col, Container, Row, Button } from "reactstrap";
import { Post } from "./Post";
import { useNavigate } from "react-router-dom";

export const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const getPosts = () => {
        getAllPosts().then(allPosts => setPosts(allPosts))
    };

    useEffect(() => {
        getPosts()
    }, []);

    const create = () => {
       navigate("/posts/add")
    }

    return (
        <div className="posts text-center">
            <h2>Posts</h2>
            <Button color="primary" onClick={create}>
                New Post
            </Button>
            <Container
                className="bg-light border"
                fluid="xl"
                >
                 {posts.map((post) => (
                    <Col className="bg-light border" key={post.id}>
                        <Post post={post} />
                    </Col>
                 ))} 
                </Container>
        </div>
    )
}