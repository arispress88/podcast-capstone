import { useEffect, useState } from "react";
import { getAllUserProfiles } from "../../Managers/UserProfileManager";
import { Card, Col, Container, Row } from "reactstrap";
import { UserProfile } from "./UserProfile";

export const UserProfileList = () => {
    const [userProfiles, setUserProfiles] =useState([]);

    useEffect(() => {
        getAllUserProfiles()
            .then(userProfiles => {
                const sortedUserProfiles = userProfiles.sort((a, b) =>
                a.displayName.localeCompare(b.displayName)
                );
                setUserProfiles(sortedUserProfiles)
            });
    }, [])

    const loggedInUser = JSON.parse(localStorage.getItem("userProfile"));
    const isAdmin = loggedInUser?.userType?.id === 1;

    return (
        <Container>
            <Row>
                <Col>
                    <h1>User Profiles</h1>
                </Col>
            </Row>
            <Row>
                {userProfiles.map((userProfile) => (
                    <Col md="4" key={userProfile.id}>
                        <UserProfile
                            key={userProfile.id}
                            userProfileProp={userProfile}
                            isAdmin={isAdmin}
                            />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}