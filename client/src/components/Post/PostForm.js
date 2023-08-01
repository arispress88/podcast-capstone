import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../Managers/PostManager";
import { Button, Form, FormGroup, Card, CardBody, Label, Input } from "reactstrap";

export const PostForm = () => {
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser);
    const navigate = useNavigate();


    const [post, update] = useState({
        title: "",
        body: "",
        createDateTime: Date.now(),
        userProfileId: aewrUserObject.id,
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const postToSendToAPI = {
            Title: post.title,
            Body: post.body,
            CreateDateTime: new Date().toISOString(),
            UserProfileId: aewrUserObject.id
        };

        return addPost(postToSendToAPI).then(navigate("/posts"))
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="title">Post Title</Label>
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
                                <Label for="body">Post Body</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Go ahead and cut a promo, speak your mind!"
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
                            Submit
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};