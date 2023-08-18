import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Button, Alert } from "reactstrap";
import { getAllUserProfiles, deleteUserProfile } from "../../Managers/UserProfileManager";
import "./UserProfile.css";

export const UserProfile = ({ userProfileProp, isAdmin }) => {
    const [userProfiles, setUserProfiles] = useState([]);

    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        getAllUserProfiles()
            .then(userProfiles => setUserProfiles(userProfiles));
    }, []);

    const handleDelete = () => {
        deleteUserProfile(userProfileProp.id).then(() => {
            setShowAlert(false)
            navigate("/userprofiles")
        });
    }

    const handleCancel = () => {
        setShowAlert(false)
    }

    const deleteProfileAlert = () => {
        return (<>
            <Alert color="danger" key={'danger'}>
                You are about to delete a user profile. This action cannot be undone. Are you sure you want to continue?
                <br></br><Link onClick={handleDelete}>Yes</Link> | <Link onClick={handleCancel}>No</Link>
            </Alert>
        </>)
    }

    const deleteButtonForAdmin = () => {
        if (isAdmin) {
            return (<>
                <Button
                    color="danger"
                    type="delete"
                    size="sm"
                    onClick={() => setShowAlert(true)}
                >Remove</Button>
                {showAlert && deleteProfileAlert()}
            </>)
        }
    }

    return (
        <Card className="m-4 text-center" color="light">
            <CardBody>
                <div>
                    <strong className="userProfile-title">
                        <Link to={`/userprofiles/${userProfileProp.id}`}><h5>{userProfileProp.displayName}</h5></Link>
                    </strong>
                    <div className="userProfile-user">
                        <strong>Role:</strong> {userProfileProp.userType.name}
                    </div>

                    {isAdmin && (
                        <div>
                            <Button
                                color="primary"
                                size="sm"
                                onClick={() => navigate(`/userprofiles/edit/${userProfileProp.id}`)}
                                >Edit</Button>
                            {/* {deleteButtonForAdmin()} */}
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    )
}