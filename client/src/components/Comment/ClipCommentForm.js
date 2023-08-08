import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { addClipComment } from "../../Managers/CommentManager";
import { Button, Form, FormGroup, Card, CardBody, Label, Input } from "reactstrap";

export const ClipCommentForm = () => {
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser);
    const navigate = useNavigate();
    const location = useLocation();

    const [clipComment, update] = useState({
        body: "",
        createDateTime: Date.now(),
        userProfileId: aewrUserObject.id,
        clipId: location.state.clipId,
    })

    const handleSaveButtonClick = (e) => {
        e.preventDefault()

        const clipCommenttoAPI = {
            Body: clipComment.body,
            CreateDateTime: new Date().toISOString(),
            UserProfileId: aewrUserObject.id,
            ClipId: location.state.clipId
        };

        return addClipComment(clipCommenttoAPI).then(navigate("/clips"))
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="body">Enter Your Comment</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Type comment here..."
                                    value={clipComment.body}
                                    onChange={
                                        (e) => {
                                            const copy = {...clipComment}
                                            copy.body = e.target.value
                                            update(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                        </Form>
                        <Button
                            color="info"
                            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                        >
                            Submit
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}