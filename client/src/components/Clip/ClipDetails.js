import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Card } from "reactstrap";
import { deleteClip, getClipById } from "../../Managers/ClipManager";
import { TikTokEmbed } from "react-social-media-embed";

export const ClipDetails = () => {
    const [clip, setClip] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const localAewrUser = localStorage.getItem("userProfile");
    const aewrUserObject = JSON.parse(localAewrUser)
    const isAdmin = aewrUserObject?.userType?.id === 1;

    useEffect(() => {
        getClipById(id).then(setClip)
    }, [])

    if (!clip) {
        return null;
    }

    const handleDelete = () => {
        deleteClip(clip.id).then(() => {
            setShowAlert(false)
            navigate("/clips")
        });
    };

    const handleCancel = () => {
        setShowAlert(false)
    }

    const deleteClipAlert = () => {
        return (<>
            <Alert color="danger" key={'danger'}>
                Would you like to delete this clip?
                <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
            </Alert>
            </>)
    }

    const deleteButtonForAdmin = () => {
        if (isAdmin) {
            return <>
                <Button
                    color="danger"
                    type="delete"
                    size="md"
                    onClick={() => {
                        setShowAlert(true);
                    }}>
                    Delete
                </Button>
                {showAlert && deleteClipAlert()}
            </>
        }
    }

    return (
        <div className="clips text-center">
            <div>
            {deleteButtonForAdmin()}
          </div>
            <Card>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TikTokEmbed url={clip.clipUrl} width={325} />
          </div>
          <h4>Posted on: {new Date(clip.createDateTime).toLocaleDateString("en-US")}</h4>
          <h5>{clip.category?.name}</h5>        
          </Card>
        </div>
        
      );
}