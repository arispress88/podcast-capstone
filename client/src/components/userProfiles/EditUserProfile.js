import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfileById, editUserProfile } from "../../Managers/UserProfileManager";
import { Form, FormGroup, Card, CardBody, Label, Button, Input } from "reactstrap";

export const EditUserProfile = () => {
    const [userProfile, update] = useState({
        firstName: "",
        lastName: "",
        displayName: "",
        email: "",
    });
    const navigate = useNavigate();
    const { userProfileId } = useParams();

    useEffect(() => {
        getUserProfileById(userProfileId)
        .then((userProfileArray) => {
            update(userProfileArray)
        });
    }, []);

    const handleSaveButtonClick = (e) => {
        e.preventDefault()
        editUserProfile(userProfile)
        .then(() => {
            navigate("/users")
        })
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="firstName">First Name</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your first name"
                                    value={userProfile.firstName}
                                    onChange={
                                        (event) => {
                                            const copy = {...userProfile}
                                            copy.firstName = event.target.value
                                            update(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastName">Last Name</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter your last name"
                                    value={userProfile.lastName}
                                    onChange={
                                        (event) => {
                                            const copy = {...userProfile}
                                            copy.lastName = event.target.value
                                            update(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="displayName">Display Name</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the name you want to use on the site"
                                    value={userProfile.displayName}
                                    onChange={
                                        (event) => {
                                            const copy = {...userProfile}
                                            copy.displayName = event.target.value
                                            update(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter an email address"
                                    value={userProfile.email}
                                    onChange={
                                        (event) => {
                                            const copy = {...userProfile}
                                            copy.email = event.target.value
                                            update(copy)
                                        }
                                    }
                                />
                            </FormGroup>
                        </Form>
                        <Button color="primary" onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                            Save
                        </Button>
                        <Button
                            color="secondary"
                            size="md"
                            onClick={() => navigate(-1)}>Back</Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}