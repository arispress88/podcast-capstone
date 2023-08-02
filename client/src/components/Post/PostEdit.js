import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPostById } from "../../Managers/PostManager";
import { Button, Form, FormGroup, Card, CardBody, Label, Input } from "reactstrap";


export const PostEdit = () => {
    const navigate = useNavigate();
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const { postId } = useParams();

    const [post, update] = useState({
        title: "",
        body: "",
        createDateTime: "",
        userProfileId: aewrUserObject.id
    })

    useEffect(() => {
        getPostById(postId)
        .then((postArray) => {
            update(postArray)
        })
    }, [postId]);

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const postToChange = {
            Id: parseInt(postId),
            Title: post.title,
            Body: post.body,
            CreateDateTime: post.createDateTime,
            UserProfileId: post.userProfileId
        };

        return editPost(postToChange)
        .then(() => {
            navigate("/posts")
        })
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="title">Post Title to edit</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the title of your post"
                                    value={post.title}
                                    onChange={
                                        (event) => {
                                            const copy = {...post}
                                            copy.title = event.target.value
                                            update(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="body">Post Body to edit</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Go ahead...edit your promo. This isn't live, pal"
                                    value={post.body}
                                    onChange={
                                        (event) => {
                                            const copy = {...post}
                                            copy.body = event.target.value
                                            update(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                            Save
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};