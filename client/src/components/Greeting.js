import React from "react";
import "./Greeting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faInstagram,
    faTiktok,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { TwitterTimelineEmbed } from "react-twitter-embed";


export default function Greeting () {
    return (
        <span style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: "20%",
            marginTop: "-0.5rem",
            textAlign: "center",
        }}>
        <div className="greeting">
            <h1>Welcome to the AEWR Podcast web page!</h1>
            <p>Follow us on social media for more up-to-date info about episode releases!</p>
            <div className="social-container">
                <a href="https://www.twitter.com/AEWRPod"
                     className="twitter social">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a href="https://www.instagram.com/aewrpod"
                        className="instagram social">
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
                <a href="https://www.tiktok.com/@aewrpod316"
                        className="tiktok social">
                    <FontAwesomeIcon icon={faTiktok} size="2x" />
                </a>
                <a href="https://www.youtube.com/@attitudeerawrestlingreview8887"
                        className="youtube social">
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
            </div>
            <p><strong className="email">Email us!</strong></p>
            <strong><a href="mailto:aewr316@gmail.com">aewr316@gmail.com</a></strong>
        </div>
            <h2 className="tweets">Latest Tweets</h2>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="AEWRPod"
                options={{height: 400}}
            />
        
        </span>
    );
};