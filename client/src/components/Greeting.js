import React from "react";

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
            <div className="social-media-links">
                <p><strong>Twitter/IG: @AEWRPod</strong></p>
                <p><strong>TikTok: @aewr316</strong></p>
                <p><strong>YouTube: Attitude Era Wrestling Review</strong></p>
            </div>
            <p><strong>Email us!</strong></p>
            <strong><a href="mailto:aewr316@gmail.com">aewr316@gmail.com</a></strong>
        </div>
        </span>
    );
};