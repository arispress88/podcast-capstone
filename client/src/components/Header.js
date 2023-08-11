import React, { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../Managers/UserProfileManager';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import logo from "../img/aewr-logo.png"

export default function Header({ isLoggedIn, setIsLoggedIn }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="secondary" dark expand="md">
                <NavbarBrand tag={RRNavLink} to="/">
                    <img className="logo" src={logo} alt="AEWR Logo" />
                    
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/">Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/posts">Posts</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/clips">Clips</NavLink>
                                </NavItem></>
                        }

                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/category">Categories</NavLink>
                            </NavItem>
                        }

                        {isLoggedIn &&
                            <NavItem>
                                <NavLink tag={RRNavLink} to="/users">User Profiles</NavLink>
                            </NavItem>}
                    </Nav>
                    <Nav navbar>

                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={() => {
                                            logout()
                                            setIsLoggedIn(false)
                                        }}>Logout</a>
                                </NavItem>
                            </>
                        }

                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}