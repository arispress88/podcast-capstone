import React from "react";
import { Route, Routes } from "react-router-dom";
import Greeting from "./Greeting";
import Login from "./Login";
import { UserProfileList } from "./userProfiles/UserProfileList";
import { UserProfileDetails } from "./userProfiles/UserProfileDetails";
import { EditUserProfile } from "./userProfiles/EditUserProfile";
import CategoryList from "./Category/CategoryList";

export default function ApplicationViews() {
    return (
        <Routes>
            <Route path="/" element={<Greeting />} />
            <Route path="/users" element={<UserProfileList />} />
            <Route path="/userprofiles/:userProfileId" element={<UserProfileDetails />} />
            <Route path="/userprofiles/edit/:userProfileId" element={<EditUserProfile />} />
            <Route path="/category" element={<CategoryList />} />
        </Routes>
    );
}