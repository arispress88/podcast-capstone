import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileById } from "../../Managers/UserProfileManager";
import { Card, CardBody, CardImg, CardTitle, CardSubtitle, Button, Container, Row, Col } from "reactstrap";

export const UserProfileDetails = () => {
    const { userProfileId } = useParams();
    const [userProfile, setUserProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getUserProfileById(userProfileId)
            .then(userProfileFromAPI => {
                setUserProfile(userProfileFromAPI);
                console.log(userProfileFromAPI)
            });
    }, []);

    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    const isAdmin = loggedInUser?.userType?.id === 1;

    return (
        <Container>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3}}>
                    <Card className="m-auto">
                        <CardBody>
                            <CardTitle tag="h4">{userProfile.displayName}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2">Email: {userProfile.email}</CardSubtitle>
                            {isAdmin && (
                                <CardSubtitle tag="h6" className="mb-2">Full Name: {userProfile.firstName} {userProfile.lastName}</CardSubtitle>
                            )}
                            <CardSubtitle tag="h6" className="mb-2">Role: {userProfile.userType?.name}</CardSubtitle>
                            <CardSubtitle tag="h6" className="mb-2">Creation Date: {
                                new Date(userProfile.createDateTime).toLocaleDateString('en-US')
                            }</CardSubtitle>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}