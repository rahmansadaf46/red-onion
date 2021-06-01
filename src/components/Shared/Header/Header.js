import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Header.css'
import logo from '../../../fakeData/images/logo2.png'
import { getDatabaseCart } from '../../../utilities/databaseManager';
import fakeData from '../../../fakeData';
import { UserContext } from '../../../App';

const Header = ({ cart }) => {
    // const [cart, setCart] = useState([]);

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const logout = () => {
        sessionStorage.clear();
        localStorage.clear();
        window.location.assign("/");
    }
    return (
        <div>
            <Navbar fixed="top" className=" bg-white" expand="lg">
                <Navbar.Brand ><Link to='/'><img style={{ width: '150px', marginLeft: '90px' }} src={logo} alt="" /></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">


                    </Nav>
                    <Form inline>

                        {
                            cart ? <div className="numberCircle" ><b>{cart}</b></div> : <div></div>

                        }
                        {/* */}

                        <Link to='/checkout' className="cart"><ShoppingCartIcon /></Link>
                        {
                            loggedInUser.email || sessionStorage.getItem('token') ?
                                <div className="row">
                                    <Link to='/' onClick={logout} className="btn login ml-3" style={{ borderRadius: '30px', marginRight: '70px' }}><b>Log out</b></Link>
                                    <p style={{ position: 'relative', left: '-50px', top: '7px', color: '#E51A4B' }}><b>{sessionStorage.getItem('name').split(" ").slice(0, 1)}</b></p>
                                </div>
                                :
                                <div><Link to='/login' style={{ borderRadius: '30px' }} className="btn mr-3 login"><b>Login</b></Link>
                                    <Link to='/signup' style={{ borderRadius: '30px', marginRight: '70px' }} className="btn login"><b>Sign Up</b></Link></div>
                        }

                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;