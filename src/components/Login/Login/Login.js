import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../../../fakeData/images/logo2.png';
import './Login.css';
import { Button, Form } from 'react-bootstrap';
import {  initializeLoginFramework, signInWithEmailAndPassword } from '../firebase/loginManager';
import { UserContext } from '../../../App';

const Login = () => {
    // const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        email: '',
        password: '',
        error: '',
        success: false
    });
    const [msg, setMsg] = useState('');
    const [btn, setBtn] = useState(true);

    initializeLoginFramework();
    const [, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    // const signOut = () => {
    //     handleSignOut()
    //         .then(res => {
    //             handleResponse(res, false);
    //         })
    // }

    const blur = (e) => {
        if (e.target.name === 'email') {
            const emailValid = /\S+@\S+\.\S+/.test(e.target.value);
            if (!emailValid) {
                setMsg('Email is not valid');
                setBtn(true);
            }
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            if (!passwordHasNumber || !isPasswordValid) {
                setMsg('Password is not valid');
                setBtn(true);
            }
        }
    }

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value)

        let isFieldValid = true;
        if (e.target.name === 'email') {
            const emailValid = /\S+@\S+\.\S+/.test(e.target.value);

            isFieldValid = emailValid;
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);

            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            setBtn(false);
            setMsg('');
            // console.log(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        // console.log(user.email, user.password)


        if (user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    if (res.success) {
                        handleResponse(res, true);

                    }
                    setMsg(res.error)
                    // console.log(res.success);
                })
        }
        e.preventDefault();
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }


    return (
        <div className="login-container">
            <div style={{ position: 'relative', top: '120px' }} className="text-center container">
                <Link to='/home'>
                    <img width='300px' src={logo} alt="" />
                </Link>
                <div className="mt-5  d-flex justify-content-center">

                    <Form onSubmit={handleSubmit} style={{ width: '450px' }}>
                        <p style={{ fontSize: '20px', color: '#E51A4B' }} ><b>{msg}</b></p>
                        <Form.Group className="mt-4" controlId="formBasicEmail">
                            <Form.Control onBlur={blur} onChange={handleChange} style={{ height: "60px", background: '#F5F5F5' }} name="email" type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="mt-4" controlId="formBasicPassword">
                            <Form.Control onBlur={blur} onChange={handleChange} style={{ height: "60px", background: '#F5F5F5' }} name="password" type="password" placeholder="Password" />
                        </Form.Group>


                        <Button disabled={btn} style={{ padding: '10px 195px' }} variant="danger" type="submit">
                            Sign in</Button>
                        <br />
                        <br />
                        <Link to="/signup" style={{ color: '#E51A4B' }}>Create an Account</Link>
                    </Form>

                </div>
            </div>
        </div>
    );
};

export default Login;