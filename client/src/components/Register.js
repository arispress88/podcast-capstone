import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";
import './Login.css'


export default function Register({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userType, setUserType] = useState("");
  const [userTypeId, setUserTypeId] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (!userType) {
      alert("Please select a User Type (Admin or User).");
      return;
    }

    //password was not active in this application
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");

    } else {
      const userProfile = { firstName, lastName, displayName, email, userType, userTypeId};
      register(userProfile, password)
        .then(() => {
          setIsLoggedIn(true)
          navigate('/')
        });
    }
 };

 //This is makes it so a new user can register as an author or admin. People wouldn't normally be given this ability in a real app and would need permissions. We could always uncomment the hard code in the userprofilecontroller in c# to automatically register authors. I found that You still have to have this function though for it to have something to send that can be overwritten
  const adminOrUser = (e) => {
    e.preventDefault();
    const userTypeValue = parseInt(e.target.value);
    if (userTypeValue === 1){
      setUserType({ id: 1, name: "Admin"})
      setUserTypeId(1)
    } else if (userTypeValue === 2) {
      setUserType({ id: 2, name: "User"})
      setUserTypeId(2)
    } else {
      alert("Please enter '1' or '2'.")
      setUserType("")
    }
  }

  return (
    <div className="login-container">
      <div className="big-image"></div>
    <Form className="login-form" onSubmit={registerClick}>
      <fieldset>
      <FormGroup>
          <Label htmlFor="userType">User Type (Admin = 1, User = 2)</Label>
          <Input id="userType" type="text" onChange={adminOrUser} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
    </div>
  );
}