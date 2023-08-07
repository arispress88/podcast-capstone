import React from "react";
import { Route, Routes } from "react-router-dom";
import Greeting from "./Greeting";
import Login from "./Login";
import { UserProfileList } from "./userProfiles/UserProfileList";
import { UserProfileDetails } from "./userProfiles/UserProfileDetails";
import { EditUserProfile } from "./userProfiles/EditUserProfile";
import CategoryList from "./Category/CategoryList";
import { PostList } from "./Post/PostList";
import { PostForm } from "./Post/PostForm";
import { PostDetails } from "./Post/PostDetails";
import { PostEdit } from "./Post/PostEdit";
import { ClipList } from "./Clip/ClipList";
import { AddClip } from "./Clip/AddClip";
import { ClipDetails } from "./Clip/ClipDetails";
import { WWEClip } from "./Clip/WWEClip";
import { WCWClip } from "./Clip/WCWClip";
import { PostCommentList } from "./Comment/PostCommentList";
import { PostCommentForm } from "./Comment/PostCommentForm";

export default function ApplicationViews() {
    return (
        <Routes>
            <Route path="/" element={<Greeting />} />
            <Route path="/users" element={<UserProfileList />} />
            <Route path="/userprofiles/:userProfileId" element={<UserProfileDetails />} />
            <Route path="/userprofiles/edit/:userProfileId" element={<EditUserProfile />} />
            <Route path="/category" element={<CategoryList />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/add" element={<PostForm />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/posts/edit/:postId" element={<PostEdit />} />
            <Route path="/clips" element={<ClipList />} />
            <Route path="/clips/add" element={<AddClip />} />
            <Route path="/clips/:id" element={<ClipDetails />} />
            <Route path="/clips/category/WWE" element={<WWEClip />} />
            <Route path="/clips/category/WCW" element={<WCWClip />} />
            <Route path="/postcomment/getpostcommentsbypostid/:postId" element={<PostCommentList />} />
            <Route path="/postcomment/add" element={<PostCommentForm />} />
        </Routes>
    );
}