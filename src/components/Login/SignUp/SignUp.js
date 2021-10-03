import React, {  useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
// import { UserContext } from '../../../App';
import logo from '../../../fakeData/images/logo2.png';


import { createUserWithEmailAndPassword, initializeLoginFramework } from '../firebase/loginManager';

const SignUp = () => {
    // const [ setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });
    const [msg, setMsg] = useState('')

    initializeLoginFramework();
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [confirm, setConfirm] = useState(false);

    // const blur = (e) => {
    //     if (e.target.name === 'email') {
    //         const emailValid = /\S+@\S+\.\S+/.test(e.target.value);
    //         if (!emailValid) {
    //             setMsg('Email is not valid');
    //             setBtn(true);
    //         }
    //     }

    //     if (e.target.name === 'password') {

    //         pass1 = e.target.value;

    //         const isPasswordValid = e.target.value.length > 6;
    //         const passwordHasNumber = /\d{1}/.test(e.target.value);
    //         if (!passwordHasNumber || !isPasswordValid) {
    //             setMsg('Password is not valid');
    //             setBtn(true);
    //         }
    //         else {
    //             setBtn(false);
    //             setMsg('');
    //         }
    //     }
    //     if (e.target.name === "confirmPassword") {
    //         pass2 = e.target.value;
    //         const value = pass1 === pass2;

    //         // console.log(pass2, pass);
    //         if (!value) {
    //             setMsg('Password is not Matched');
    //             setBtn(true);
    //             // console.log('Password is not Matched');
    //         }
    //         if (value) {
    //             setBtn(false);
    //             setPass(value);
    //         }
    //     }
    // }
    /* Form validation and give error */
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    // let pass1, pass2;
    const handleFormValidation = (e) => {
        let isFieldValid = true;
        const newError = { ...errors };

        if (e.target.name === "name") {
            isFieldValid = e.target.value.length > 2;
            if (!isFieldValid) {
                newError[e.target.name] = "Name is not valid";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }

        if (e.target.name === "email") {
            isFieldValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value);
            if (!isFieldValid) {
                newError[e.target.name] = "Email is not valid";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }

        if (e.target.name === "password" || e.target.name === "confirmPassword") {
            const isPasswordLengthValid = e.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(e.target.value);

            isFieldValid = isPasswordLengthValid && passwordHasNumber;

            // if (e.target.name === "password") {
            //     pass1 = e.target.value;
            //     if (!isFieldValid) {
            //         newError[e.target.name] = "Password is not valid";
            //         setErrors(newError);
            //     } else {
            //         newError[e.target.name] = "";
            //         setErrors(newError);
            //     }
            // }
            // if (e.target.name === "confirmPassword") {
            //     pass2 = e.target.value;
            //     if (pass1 !== pass2) {
            //         newError[e.target.name] = "Password is not matched";
            //         isFieldValid = false;
            //         setErrors(newError);

            //     } else {
            //         isFieldValid = true;
            //         newError[e.target.name] = "";
            //         setErrors(newError);
            //     }
            // }
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            setConfirm(true);

        }
    };


    // const handleChange = (e) => {
    //     // console.log(e.target.name, e.target.value)

    //     let isFieldValid = true;

    //     if (e.target.name === 'email') {
    //         const emailValid = /\S+@\S+\.\S+/.test(e.target.value);

    //         isFieldValid = emailValid;
    //     }

    //     if (e.target.name === 'password') {
    //         pass1 = e.target.value;
    //         const isPasswordValid = e.target.value.length > 6;
    //         const passwordHasNumber = /\d{1}/.test(e.target.value);

    //         isFieldValid = isPasswordValid && passwordHasNumber;
    //     }
    //     if (e.target.name === "confirmPassword") {
    //         pass2 = e.target.value;
    //         if (pass1 !== pass2) {
    //             setMsg('Password is not Matched');
    //             setBtn(true);
    //         }
    //         if (pass1 === pass2) {
    //             isFieldValid = true;
    //         }
    //     }
    //     if (isFieldValid) {
    //         const newUserInfo = { ...user };
    //         newUserInfo[e.target.name] = e.target.value;
    //         setUser(newUserInfo);
    //         setBtn(false);
    //         setMsg('');
    //     }
    // }

    const handleSubmit = (e) => {
        console.log(user.email, user.password)


        if (confirm) {
            setErrors({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    if (res.success) {
                        handleResponse(res, true);

                    }
                    setMsg(res.error)

                    console.log(res)
                })
        }
        e.preventDefault();
    }
    const handleResponse = (res, redirect) => {
        setUser(res);
        // setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    return (
        <div className="login-container">
            <div style={{ position: 'relative', top: '70px' }} className="text-center container">
                <Link to='/home'>
                    <img width='300px' src={logo} alt="" />
                </Link>
                <div className="mt-5 d-flex justify-content-center">
                    <Form onSubmit={handleSubmit} style={{ width: '450px' }}>
                        {errors.name.length > 0 && <p style={{ fontSize: '20px', color: '#E51A4B' }} ><b>{errors.name}</b></p>}
                        {errors.email.length > 0 && <p style={{ fontSize: '20px', color: '#E51A4B' }} ><b>{errors.email}</b></p>}
                        {errors.password.length > 0 && <p style={{ fontSize: '20px', color: '#E51A4B' }} ><b>{errors.password}</b></p>}
                        {errors.confirmPassword.length > 0 && <p style={{ fontSize: '20px', color: '#E51A4B' }} ><b>{errors.confirmPassword}</b></p>}
                        <p style={{ fontSize: '20px', color: '#E51A4B' }} ><b>{msg}</b></p>
                        <Form.Group controlId="formBasicName">
                            <Form.Control required onBlur={handleFormValidation} name="name" style={{ height: "60px", background: '#F5F5F5' }} type="name" placeholder="Name" />
                        </Form.Group>
                        <Form.Group className="mt-4" controlId="formBasicEmail">
                            <Form.Control required onBlur={handleFormValidation} name="email" style={{ height: "60px", background: '#F5F5F5' }} type="email" placeholder="Email" />
                        </Form.Group>

                        <Form.Group className="mt-4" controlId="formBasicPassword">
                            <Form.Control required onBlur={handleFormValidation} name="password" style={{ height: "60px", background: '#F5F5F5' }} type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mt-4" controlId="formBasicPassword">
                            <Form.Control required onBlur={handleFormValidation} name="confirmPassword" style={{ height: "60px", background: '#F5F5F5' }} type="password" placeholder="Confirm Password" />
                        </Form.Group>

                        <Button style={{ padding: '10px 195px' }} variant="danger" type="submit">
                            Sign up</Button>
                        <br />
                        <br />
                        <Link to="/login" style={{ color: '#E51A4B' }}>Already have an Account</Link>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;